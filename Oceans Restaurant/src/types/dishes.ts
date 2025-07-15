export interface Dish {
    id: number;
    code: string;
    name: string;
    description: string;
    price: number;
    image: string;
    active?: number;
}