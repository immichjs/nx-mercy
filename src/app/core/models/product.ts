export interface Product {
  id: number;
  name: string;
  description?: string;
  discount?: number;
  price: number;
  loading?: boolean;
}
