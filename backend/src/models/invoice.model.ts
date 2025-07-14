import db from "../services/database.service";
import {
  Invoice,
  InvoiceDetail,
  CreateInvoiceDto,
  InvoiceWithDetails,
} from "../interfaces/invoice.interface";

class InvoiceModel {
  async createInvoice(
    invoiceData: CreateInvoiceDto
  ): Promise<InvoiceWithDetails> {
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      // Valor por defecto para status (1 = "pendiente" o similar)
      const statusId = invoiceData.status_id || 1;

      // 1. Crear la factura principal con el status proporcionado o el por defecto
      const [invoiceResult] = await connection.query(
        "INSERT INTO invoices (status_id, created_at, descripcion, total) VALUES (?, ?, ?, 0)",
        [statusId, new Date().toISOString(), invoiceData.descripcion]
      );

      const invoiceId = (invoiceResult as any).insertId;
      let total = 0;

      // Resto del método permanece igual...
      for (const item of invoiceData.items) {
        const [product] = await connection.query(
          "SELECT price FROM products WHERE id = ? AND active = TRUE",
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

  async getAllInvoices(): Promise<InvoiceWithDetails[]> {
    try {
      // 1. Obtener facturas con desestructuración segura
      const [invoices] = await db.query(
        "SELECT * FROM invoices ORDER BY created_at DESC"
      );

      // Validación de resultados
      if (!Array.isArray(invoices)) {
        console.error("La consulta no devolvió un array:", invoices);
        return [];
      }

      // 2. Usar Promise.all para paralelizar las consultas de detalles
      const invoicesWithDetails = await Promise.all(
        (invoices as Invoice[]).map(async (invoice) => {
          try {
            const [details] = await db.query(
              "SELECT * FROM invoicesDetails WHERE invoice_id = ?",
              [invoice.id]
            );

            return {
              ...invoice,
              details: Array.isArray(details)
                ? (details as InvoiceDetail[])
                : [],
            };
          } catch (error) {
            console.error(
              `Error obteniendo detalles para factura ${invoice.id}:`,
              error
            );
            return {
              ...invoice,
              details: [],
            };
          }
        })
      );

      return invoicesWithDetails;
    } catch (error) {
      console.error("Error en getAllInvoices:", error);
      throw error; // O return []; si prefieres manejar el error silenciosamente
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

      // Eliminar detalles primero
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
