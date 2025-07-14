export interface Invoice {
  id: number;
  status_id: number;
  created_at: string;
  descripcion?: string;
  total: number;
}

export interface InvoiceDetail {
  id: number;
  invoice_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface CreateInvoiceDto {
  descripcion?: string;
  status_id?: number;
  items: {
    product_id: number;
    quantity: number;
  }[];
}

export interface InvoiceWithDetails extends Invoice {
  details: InvoiceDetail[];
}