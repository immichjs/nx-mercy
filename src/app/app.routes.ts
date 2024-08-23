import { Routes } from '@angular/router';
import { ProductComponent } from './features/product/product.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { OrderComponent } from './features/order/order.component';

export const routes: Routes = [
  { path: 'products', component: ProductComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'orders', component: OrderComponent },
];
