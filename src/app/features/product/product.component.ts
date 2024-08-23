import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ProductStateService } from '../../core/services/product-state.service';
import { AsyncPipe, CurrencyPipe, PercentPipe } from '@angular/common';
import { CheckoutStateService } from '../../core/services/checkout-state.service';
import { Product } from '../../core/models/product';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { timer } from 'rxjs';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    HeaderComponent,
    AsyncPipe,
    CurrencyPipe,
    PercentPipe,
    LoadingComponent,
  ],
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  public readonly productService = inject(ProductService);
  public readonly _productStateService = inject(ProductStateService);
  private readonly _checkoutStateService = inject(CheckoutStateService);
  protected products$ = this._productStateService.productsAsObservable();

  ngOnInit(): void {
    this._productStateService.onLoadProduct();
  }

  public onAddProductToCheckout(product: Product) {
    product.loading = true;

    timer(2000).subscribe(() => {
      this._checkoutStateService.addProductToCheckout(product);
      product.loading = false;
    });
  }
}
