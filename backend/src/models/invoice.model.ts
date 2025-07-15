import db from "../services/database.service";
import {
  Invoice,
  InvoiceDetail,
  CreateInvoiceDto,
  InvoiceWithDetails,
} from "../interfaces/invoice.interface";
import dayjs from "dayjs";
import type { InvoiceResponse } from "../interfaces/GetAllInvoicesType";

class InvoiceModel {
  async createInvoice(
    invoiceData: CreateInvoiceDto
  ): Promise<InvoiceWithDetails> {
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      const statusId = invoiceData.status_id || 2;

      const mysqlDate = dayjs().format("YYYY-MM-DD HH:mm:ss");

      const [invoiceResult] = await connection.query(
        "INSERT INTO invoices (status_id, created_at, descripcion, total) VALUES (?, ?, ?, 0)",
        [statusId, mysqlDate, invoiceData.descripcion]
      );

      const invoiceId = (invoiceResult as any).insertId;
      console.log(invoiceId);
      let total = 0;

      for (const item of invoiceData.items) {
        const [product] = await connection.query(
          "SELECT price FROM products WHERE id = ? AND active = 1",
          [item.product_id]
        );

        if (!product || (product as any).length === 0) {
          throw new Error(
            `Producto con ID ${item.product_id} no encontrado o inactivo`
          );
        }

        const productPrice = (product as any)[0].price;
        const itemTotal = productPrice * item.quantity;

        await connection.query(
          "INSERT INTO invoicesDetails (invoice_id, product_id, quantity, unit_price, total_price) VALUES (?, ?, ?, ?, ?)",
          [invoiceId, item.product_id, item.quantity, productPrice, itemTotal]
        );

        total += itemTotal;
      }

      await connection.query("UPDATE invoices SET total = ? WHERE id = ?", [
        total,
        invoiceId,
      ]);

      await connection.commit();

      const createdInvoice = await this.getInvoiceById(invoiceId);
      return createdInvoice!;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async getInvoiceById(id: number): Promise<InvoiceWithDetails | null> {
    const [invoice] = await db.query("SELECT * FROM invoices WHERE id = ?", [
      id,
    ]);

    if (!invoice || (invoice as any).length === 0) {
      return null;
    }

    const [details] = await db.query(
      "SELECT * FROM invoicesDetails WHERE invoice_id = ?",
      [id]
    );

    return {
      ...(invoice as any)[0],
      details: details as InvoiceDetail[],
    };
  }

  async getAllInvoices(): Promise<InvoiceResponse[]> {
    try {
      const rows = await db.query(`
        SELECT 
        i.id AS invoice_id,
        i.created_at,
        i.total,
        i.status_id,
        p.id AS product_id,
        p.name AS product_name,
        p.code AS product_code,
        idet.quantity,
        idet.unit_price,
        idet.total_price
      FROM invoices i
      JOIN invoicesDetails idet ON idet.invoice_id = i.id
      JOIN products p ON p.id = idet.product_id
      ORDER BY i.id, idet.id
    `);

      console.log("rows type:", typeof rows);
      console.log("rows isArray:", Array.isArray(rows));
      console.log("rows:", rows);

      if (!Array.isArray(rows)) {
        console.error("La consulta no devolvió un array:", rows);
        return [];
      }

      const invoiceMap = new Map<number, InvoiceResponse>();

      for (const row of rows) {
        if (!invoiceMap.has(row.invoice_id)) {
          invoiceMap.set(row.invoice_id, {
            id: row.invoice_id,
            createdAt: new Date(row.created_at).toISOString(),
            order_status: mapStatus(row.status_id),
            items: [],
            total: row.total,
          });
        }

        const invoice = invoiceMap.get(row.invoice_id)!;

        invoice.items.push({
          product_id: row.product_id,
          code: row.product_code,
          name: row.product_name,
          quantity: row.quantity,
          unit_price: row.unit_price,
          total_price: row.total_price,
        });
      }

      function mapStatus(statusId: number): string {
        switch (statusId) {
          case 1:
            return "Entregado";
          case 2:
            return "En preparación";
          case 3:
            return "Cancelado";
          default:
            return "En preparación";
        }
      }

      return Array.from(invoiceMap.values());
    } catch (error) {
      console.error("Error en getAllInvoices:", error);
      throw error;
    }
  }

  async updateInvoiceStatus(id: number, statusId: number): Promise<boolean> {
    const [result] = await db.query(
      "UPDATE invoices SET status_id = ? WHERE id = ?",
      [statusId, id]
    );

    return (result as any).affectedRows > 0;
  }

  async deleteInvoice(id: number): Promise<boolean> {
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      await connection.query(
        "DELETE FROM invoicesDetails WHERE invoice_id = ?",
        [id]
      );

      // Luego eliminar la factura
      const [result] = await connection.query(
        "DELETE FROM invoices WHERE id = ?",
        [id]
      );

      await connection.commit();

      return (result as any).affectedRows > 0;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

export default new InvoiceModel();
