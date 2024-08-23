import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { Checkout } from '../models/checkout';

@Injectable({
  providedIn: 'root',
})
export class CheckoutStateService {
  private checkout$ = new BehaviorSubject<Checkout>({
    products: [
      {
        id: 1,
        name: 'Notebook',
        price: 4500.9,
        description:
          'O notebook combina desempenho e portabilidade com um processador de última geração, 16 GB de RAM e SSD de 512 GB para armazenamento rápido. Tela Full HD de 15,6 polegadas oferece excelente qualidade de imagem, ideal para trabalho e entretenimento. Bateria de longa duração.',
        quantity: 1,
      },
    ],
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
