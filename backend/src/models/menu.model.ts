import db from '../services/database.service';
import { Product } from '../interfaces/product.interface';

class MenuModel {
  async getAllActiveProducts(): Promise<Product[]> {
    const sql = 'SELECT * FROM products WHERE active = TRUE';
    const products = await db.query(sql);
    return products as Product[];
  }

  async getProductById(id: number): Promise<Product | null> {
    const sql = 'SELECT * FROM products WHERE id = ? AND active = TRUE';
    const [product] = await db.query(sql, [id]);
    return product as Product || null;
  }
}

export default new MenuModel();