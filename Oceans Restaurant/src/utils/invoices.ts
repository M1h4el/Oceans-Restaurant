export type InvoiceItem = {
  product_id: number;
  code: string;
  name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
};

export type OrderStatus = 'Entregado' | 'En preparación' | 'Cancelado';

export type Invoice = {
  id: number;
  createdAt: string;
  order_status: OrderStatus;
  items: InvoiceItem[];
  total: number;
};

export type InvoiceList = Invoice[];