import { Request, Response } from 'express';
import menuModel from '../models/menu.model';

class MenuController {
  async getActiveProducts(req: Request, res: Response) {
    try {
      const products = await menuModel.getAllActiveProducts();
      res.json({
        success: true,
        data: products
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const product = await menuModel.getProductById(id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }

      res.json({
        success: true,
        data: product
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

export default new MenuController();