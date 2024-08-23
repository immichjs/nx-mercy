import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Product } from '../models/product';
import { Checkout } from '../models/checkout';
import { Order } from '../models/order';
import { ProductCheckout } from '../models/product-checkout';

@Injectable({
  providedIn: 'root',
})
export class OrderStateService {
  private orders$ = new BehaviorSubject<Order[]>([]);

  public addOrder(checkout: Checkout) {
    const currentCheckout = this.orders$.getValue();
    const updatedCheckout = [...currentCheckout, { checkout }];

    this.orders$.next(updatedCheckout);
  }

  public ordersAsObservable() {
    return this.orders$.asObservable();
  }

  public countOrders$() {
    return this.orders$.pipe(tap((e) => e.length));
  }
}
