import db from '../services/database.service';
import { Product } from '../interfaces/product.interface';

class MenuModel {
  async getAllActiveProducts(): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM products WHERE active = 1';
      const products = await db.query(sql);
      return products as Product[];
    } catch (error) {
      console.error('Error getting active products:', error);
      throw new Error('Error retrieving active products');
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM products';
      const products = await db.query(sql);
      return products as Product[];
    } catch (error) {
      console.error('Error getting all products:', error);
      throw new Error('Error retrieving all products');
    }
  }

  async getProductById(id: number): Promise<Product | null> {
    try {
      const sql = 'SELECT * FROM products WHERE id = ?';
      const [product] = await db.query(sql, [id]);
      return product as Product || null;
    } catch (error) {
      console.error(`Error getting product with id ${id}:`, error);
      throw new Error(`Error retrieving product with id ${id}`);
    }
  }

  async createProduct(productData: Omit<Product, 'id' | 'code'>): Promise<Product> {
    try {
      const [maxCode] = await db.query(
        'SELECT MAX(CAST(SUBSTRING(code, 5) AS UNSIGNED)) as maxNum FROM products WHERE code LIKE "PLT-%"'
      );

      const nextNumber = (maxCode?.maxNum || 0) + 1;
      const code = `PLT-${nextNumber.toString().padStart(4, '0')}`;

      const sql = 'INSERT INTO products (name, code, description, price, image, active) VALUES (?, ?, ?, ?, ?, ?)';
      const result = await db.query(sql, [
        productData.name,
        code,
        productData.description,
        productData.price,
        productData.image,
        productData.active ?? 1
      ]);

      return this.getProductById(result.insertId) as Promise<Product>;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Error creating product');
    }
  }

  async updateProduct(id: number, productData: Partial<Product>): Promise<Product | null> {
    try {
      const currentProduct = await this.getProductById(id);
      if (!currentProduct) return null;

      const sql = 'UPDATE products SET name = ?, description = ?, price = ?, image = ?, active = ? WHERE id = ?';
      await db.query(sql, [
        productData.name ?? currentProduct.name,
        productData.description ?? currentProduct.description,
        productData.price ?? currentProduct.price,
        productData.image ?? currentProduct.image,
        productData.active !== undefined ? productData.active : currentProduct.active,
        id
      ]);

      return this.getProductById(id);
    } catch (error) {
      console.error(`Error updating product with id ${id}:`, error);
      throw new Error(`Error updating product with id ${id}`);
    }
  }

  async deleteProduct(id: number): Promise<boolean> {
    try {
      const sql = 'DELETE FROM products WHERE id = ?';
      const result = await db.query(sql, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      throw new Error(`Error deleting product with id ${id}`);
    }
  }

  async deactivateProduct(id: number): Promise<boolean> {
    try {
      const sql = 'UPDATE products SET active = 0 WHERE id = ?';
      const result = await db.query(sql, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error deactivating product with id ${id}:`, error);
      throw new Error(`Error deactivating product with id ${id}`);
    }
  }
}

export default new MenuModel();
