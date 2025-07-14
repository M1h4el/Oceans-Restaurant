import { Request, Response } from 'express';
import invoiceModel from '../models/invoice.model';
import { CreateInvoiceDto } from '../interfaces/invoice.interface';

class InvoiceController {
  async createInvoice(req: Request, res: Response) {
    try {
      const invoiceData: CreateInvoiceDto = req.body;
      const newInvoice = await invoiceModel.createInvoice(invoiceData);
      
      res.status(201).json({
        success: true,
        data: newInvoice
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getInvoice(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const invoice = await invoiceModel.getInvoiceById(id);
      
      if (!invoice) {
        return res.status(404).json({
          success: false,
          message: 'Factura no encontrada'
        });
      }

      res.json({
        success: true,
        data: invoice
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async getAllInvoices(req: Request, res: Response) {
    try {
      const invoices = await invoiceModel.getAllInvoices();
      res.json({
        success: true,
        data: invoices
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async updateInvoiceStatus(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const statusId = parseInt(req.body.statusId);
      
      const updated = await invoiceModel.updateInvoiceStatus(id, statusId);
      
      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'Factura no encontrada'
        });
      }

      res.json({
        success: true,
        message: 'Estado de factura actualizado'
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async deleteInvoice(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await invoiceModel.deleteInvoice(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Factura no encontrada'
        });
      }

      res.json({
        success: true,
        message: 'Factura eliminada'
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

export default new InvoiceController();