import { Component, inject, OnInit } from '@angular/core';
import { CheckoutStateService } from '../../core/services/checkout-state.service';
import { Checkout } from '../../core/models/checkout';
import { Router, RouterModule } from '@angular/router';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { ProductCheckout } from '../../core/models/product-checkout';
import { timer } from 'rxjs';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterModule, JsonPipe, CurrencyPipe, LoadingComponent],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {
  private readonly _checkoutStateService = inject(CheckoutStateService);
  private readonly _router = inject(Router);
  public checkout: Checkout = {
    products: [],
  };
  public costCheckout: any = {};
  public loadingFinishOrder = false;

  ngOnInit(): void {
    this._checkoutStateService
      .checkoutAsObservable()
      .subscribe((checkout) => (this.checkout = checkout));

    this.onCalculateCheckout();
  }

  public onCalculateCheckout() {
    this._checkoutStateService.onCalculateCheckout().subscribe((checkout) => {
      this.costCheckout.total = checkout
        .map((product) => product.price)
        .reduce((current, next) => current + next);

      this.costCheckout.subTotal = checkout
        .map((product) => product.price)
        .reduce((current, next) => current + next);

      this.costCheckout.economy = 0;
    });
  }

  public onIncrementProductQuantity(product: ProductCheckout) {
    if (product.quantity) {
      product.quantity++;
    }
  }

  public onDecrementProductQuantity(product: ProductCheckout) {
    if (!product.quantity) return;

    if (product.quantity === 1) {
      const confirm = window.confirm('Deseja remover este item do carrinho?');
      if (!confirm) return;

      const productIndex = this.checkout.products.findIndex(
        (p) => p.id === product.id
      );
      this._checkoutStateService.removeProductFromCheckout(productIndex);
      return;
    }

    product.quantity--;
  }

  public onFinishOrder() {
    this.loadingFinishOrder = true;

    timer(3000).subscribe(() => {
      this.loadingFinishOrder = false;
      this._router.navigate(['/orders']);
    });
  }
}
