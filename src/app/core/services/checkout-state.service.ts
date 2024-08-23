import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { Checkout } from '../models/checkout';

@Injectable({
  providedIn: 'root',
})
export class CheckoutStateService {
  private checkout$ = new BehaviorSubject<Checkout>({
    products: [],
  });

  public addProductToCheckout(product: Product) {
    const currentCheckout = this.checkout$.getValue();
    const newProduct = { ...product, quantity: 1 };

    const updatedCheckout = {
      products: [...currentCheckout.products, newProduct],
    };

    this.checkout$.next(updatedCheckout);
  }

  public removeProductFromCheckout(productIndex: number) {
    const currentCheckout = this.checkout$.getValue();
    currentCheckout.products.splice(productIndex, 1);

    const updatedCheckout = {
      products: [...currentCheckout.products],
    };

    this.checkout$.next(updatedCheckout);
  }

  public resetCheckout() {
    this.checkout$.next({ products: [] });
  }

  public checkoutAsObservable() {
    return this.checkout$.asObservable();
  }

  public productsInCheckoutCount$() {
    return this.checkout$.pipe(map((checkout) => checkout.products.length));
  }

  public onCalculateCheckout() {
    return this.checkout$
      .asObservable()
      .pipe(map((product) => product.products));
  }
}
