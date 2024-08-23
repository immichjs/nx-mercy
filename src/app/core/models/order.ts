import { Checkout } from './checkout';
import { ProductCheckout } from './product-checkout';

export interface Order {
  checkout: Checkout;
}
