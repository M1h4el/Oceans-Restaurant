export const invoices: Invoice[] = [
  {
    id: 1,
    createdAt: "2023-05-15T14:32:18Z",
    order_status: "Entregado",
    items: [
      {
        product_id: 1,
        code: "PLT-001",
        name: "Pizza Margarita",
        quantity: 2,
        unit_price: 12.99,
        total_price: 25.98
      },
      {
        product_id: 3,
        code: "PLT-003",
        name: "Hamburguesa Clásica",
        quantity: 1,
        unit_price: 10.50,
        total_price: 10.50
      },
      {
        product_id: 12,
        code: "PLT-012",
        name: "Ceviche Mixto",
        quantity: 1,
        unit_price: 17.50,
        total_price: 17.50
      }
    ],
    total: 53.98
  },
  {
    id: 2,
    createdAt: "2023-05-16T19:18:05Z",
    order_status: "Entregado",
    items: [
      {
        product_id: 15,
        code: "PLT-015",
        name: "Churrasco Argentino",
        quantity: 2,
        unit_price: 20.00,
        total_price: 40.00
      },
      {
        product_id: 2,
        code: "PLT-002",
        name: "Sushi Variado",
        quantity: 3,
        unit_price: 18.50,
        total_price: 55.50
      },
      {
        product_id: 10,
        code: "PLT-010",
        name: "Arepas Rellenas",
        quantity: 2,
        unit_price: 7.00,
        total_price: 14.00
      }
    ],
    total: 109.50
  },
  {
    id: 3,
    createdAt: "2023-05-17T11:05:33Z",
    order_status: "En preparación",
    items: [
      {
        product_id: 7,
        code: "PLT-007",
        name: "Ramen Japonés",
        quantity: 4,
        unit_price: 13.50,
        total_price: 54.00
      },
      {
        product_id: 5,
        code: "PLT-005",
        name: "Tacos al Pastor",
        quantity: 3,
        unit_price: 8.50,
        total_price: 25.50
      }
    ],
    total: 79.50
  },
  {
    id: 4,
    createdAt: "2023-05-18T13:22:10Z",
    order_status: "Cancelado",
    items: [
      {
        product_id: 11,
        code: "PLT-011",
        name: "Bandeja Paisa",
        quantity: 1,
        unit_price: 16.00,
        total_price: 16.00
      },
      {
        product_id: 4,
        code: "PLT-004",
        name: "Ensalada César",
        quantity: 2,
        unit_price: 9.00,
        total_price: 18.00
      },
      {
        product_id: 9,
        code: "PLT-009",
        name: "Lasagna Tradicional",
        quantity: 1,
        unit_price: 13.00,
        total_price: 13.00
      }
    ],
    total: 47.00
  },
  {
    id: 5,
    createdAt: "2023-05-19T20:45:30Z",
    order_status: "Entregado",
    items: [
      {
        product_id: 6,
        code: "PLT-006",
        name: "Pad Thai",
        quantity: 2,
        unit_price: 14.00,
        total_price: 28.00
      },
      {
        product_id: 14,
        code: "PLT-014",
        name: "Fajitas Mixtas",
        quantity: 1,
        unit_price: 15.50,
        total_price: 15.50
      },
      {
        product_id: 8,
        code: "PLT-008",
        name: "Pollo al Curry",
        quantity: 1,
        unit_price: 15.00,
        total_price: 15.00
      },
      {
        product_id: 13,
        code: "PLT-013",
        name: "Gnocchi de Papa",
        quantity: 1,
        unit_price: 11.00,
        total_price: 11.00
      }
    ],
    total: 69.50
  }
] as const;

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