import { Product } from './product';

export interface ProductCheckout extends Product {
  quantity: number;
}
