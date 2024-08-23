import { Client } from './client';
import { Product } from './product';
import { ProductCheckout } from './product-checkout';

export interface Checkout {
  products: ProductCheckout[];
}
