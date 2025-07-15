export interface InvoiceItem {
  product_id: number;
  code: string;
  name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface InvoiceResponse {
  id: number;
  createdAt: string;
  order_status: string;
  items: InvoiceItem[];
  total: number;
}