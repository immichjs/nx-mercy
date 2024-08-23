import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Product } from '../models/product';
import { ProductService } from '../../features/product/product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductStateService {
  private products$ = new BehaviorSubject<Product[]>([]);
  private readonly _productService = inject(ProductService);

  public onLoadProduct() {
    this._productService
      .getProducts()
      .pipe(take(1))
      .subscribe((products) => this.products$.next(products));
  }

  public productsAsObservable() {
    return this.products$.asObservable();
  }
}
