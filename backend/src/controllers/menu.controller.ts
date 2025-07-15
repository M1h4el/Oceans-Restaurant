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

  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await menuModel.getAllProducts();
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

  async createProduct(req: Request, res: Response) {
    try {
      const { name, description, price, image, active } = req.body;
      
      console.log(1111111111, req.body);
      if (!name || !description || !price || !image) {
        return res.status(400).json({
          success: false,
          message: 'Faltan campos obligatorios: name, description, price, image'
        });
      }

      const newProduct = await menuModel.createProduct({
        name,
        description,
        price,
        image,
        active: active !== undefined ? active : 1
      });

      res.status(201).json({
        success: true,
        data: newProduct
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const productData = req.body;

      const updatedProduct = await menuModel.updateProduct(id, productData);
      
      if (!updatedProduct) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }

      res.json({
        success: true,
        data: updatedProduct
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const success = await menuModel.deleteProduct(id);
      
      if (!success) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Producto eliminado correctamente'
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async deactivateProduct(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const success = await menuModel.deactivateProduct(id);
      
      if (!success) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Producto desactivado correctamente'
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