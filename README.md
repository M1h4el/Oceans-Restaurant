# 🍽️ Oceans Restaurant - Gestión de Pedidos

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-4.4.5-yellow?logo=vite)

Sistema de gestión de pedidos para restaurantes con roles de **dueño** y **meseros**. Desarrollado con React + TypeScript y Vite.js.

## 🚀 Instalación

1. Clona el repositorio:
   ```bash
   git clone git@github.com:tu-usuario/oceans-restaurant.git
2. Instala dependencias:
   cd Oceans Restaurant
   npm install
3. Inicia el servidor de desarrollo:
   npm run dev



   ####################### Indicaciones Backend ###########################




1 Productos:

   Estructura:
   export const dishes = [
  {
    id: 1,
    code: 'PLT-001',
    name: 'Pizza Margarita',
    description: 'Pizza con salsa de tomate, mozzarella y albahaca fresca.',
    price: 12.99,
    image: 'https://source.unsplash.com/300x200/?pizza',
  },
  {
    id: 2,
    code: 'PLT-002',
    name: 'Sushi Variado',
    description: 'Sushi fresco con salmón, atún y aguacate.',
    price: 18.5,
    image: 'https://source.unsplash.com/300x200/?sushi',
  }, ...

].

// Te anexo los types:

"export interface Dish {
    id: number;
    code: string;
    name: string;
    description: string;
    price: number;
    image: string;
}".

1.1 POST id y code los manejas tú, los demás campos los envío yo desde el front

1.2 Para el GET requiero todos los productos independientemente el usuario. Siempre debe traer todos los productos registrados que tengan un status 'active'. para que no haya conflictos de facturas viejas con productos ya borrados.

1.3 DELETE, solo cambiará status 'inactive' o 'disabled'

2. Usuarios(hashea las contraseñas con bcrypt):

2.1 POST estoy enviando solo userName, email y password

2.2 GET email y password. En el payload mandame los datos del usuario incluyendo el role ('Admin', 'Employee')

2.3 DELETE solo cambiale el status

 4. Invoices:
     Estructura:
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
  }, ...
].

// Necesitas una tabla invoices para informacion general de la factura y otra invoices_Details para cada objeto contenido en el array que te mandé arriba

// Te anexo los types por si los necesitas
"export type InvoiceItem = {
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

export type InvoiceList = Invoice[];"

3.1 POST Te va a llegar toda la estructura de arriba

3.2 GET Manda todo también
