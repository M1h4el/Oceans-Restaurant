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
  },
  {
    id: 3,
    code: 'PLT-003',
    name: 'Hamburguesa Clásica',
    description: 'Hamburguesa con queso cheddar, lechuga y tomate.',
    price: 10.5,
    image: 'https://source.unsplash.com/300x200/?burger',
  },
  {
    id: 4,
    code: 'PLT-004',
    name: 'Ensalada César',
    description: 'Ensalada con pollo, crutones y aderezo César.',
    price: 9.0,
    image: 'https://source.unsplash.com/300x200/?salad',
  },
  {
    id: 5,
    code: 'PLT-005',
    name: 'Tacos al Pastor',
    description: 'Tacos de cerdo marinados con piña y cebolla.',
    price: 8.5,
    image: 'https://source.unsplash.com/300x200/?tacos',
  },
  {
    id: 6,
    code: 'PLT-006',
    name: 'Pad Thai',
    description: 'Fideos salteados con camarón, maní y salsa de tamarindo.',
    price: 14.0,
    image: 'https://source.unsplash.com/300x200/?pad-thai',
  },
  {
    id: 7,
    code: 'PLT-007',
    name: 'Ramen Japonés',
    description: 'Sopa con fideos, cerdo, huevo y vegetales.',
    price: 13.5,
    image: 'https://source.unsplash.com/300x200/?ramen',
  },
  {
    id: 8,
    code: 'PLT-008',
    name: 'Pollo al Curry',
    description: 'Pollo en salsa curry con arroz basmati.',
    price: 15.0,
    image: 'https://source.unsplash.com/300x200/?curry',
  },
  {
    id: 9,
    code: 'PLT-009',
    name: 'Lasagna Tradicional',
    description: 'Pasta al horno con carne, bechamel y queso.',
    price: 13.0,
    image: 'https://source.unsplash.com/300x200/?lasagna',
  },
  {
    id: 10,
    code: 'PLT-010',
    name: 'Arepas Rellenas',
    description: 'Arepas con queso y pernil o pollo.',
    price: 7.0,
    image: 'https://source.unsplash.com/300x200/?arepas',
  },
  {
    id: 11,
    code: 'PLT-011',
    name: 'Bandeja Paisa',
    description: 'Plato típico con frijoles, arroz, carne y huevo.',
    price: 16.0,
    image: 'https://source.unsplash.com/300x200/?colombian-food',
  },
  {
    id: 12,
    code: 'PLT-012',
    name: 'Ceviche Mixto',
    description: 'Pescado y mariscos marinados en limón y especias.',
    price: 17.5,
    image: 'https://source.unsplash.com/300x200/?ceviche',
  },
  {
    id: 13,
    code: 'PLT-013',
    name: 'Gnocchi de Papa',
    description: 'Gnocchis suaves en salsa de tomate y albahaca.',
    price: 11.0,
    image: 'https://source.unsplash.com/300x200/?gnocchi',
  },
  {
    id: 14,
    code: 'PLT-014',
    name: 'Fajitas Mixtas',
    description: 'Fajitas de carne y pollo con vegetales y tortillas.',
    price: 15.5,
    image: 'https://source.unsplash.com/300x200/?fajitas',
  },
  {
    id: 15,
    code: 'PLT-015',
    name: 'Churrasco Argentino',
    description: 'Corte de carne a la parrilla con chimichurri.',
    price: 20.0,
    image: 'https://source.unsplash.com/300x200/?steak',
  },
];

export interface Dish {
    id: number;
    code: string;
    name: string;
    description: string;
    price: number;
    image: string;
}