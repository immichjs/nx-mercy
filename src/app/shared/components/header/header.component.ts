import { Component, inject, NgZoneOptions } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckoutStateService } from '../../../core/services/checkout-state.service';
import { map, Subscription } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, JsonPipe, AsyncPipe, NavigationComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public readonly _checkoutStateService = inject(CheckoutStateService);
  private subscription: Subscription = new Subscription();

  public productCount = 0;

  ngOnInit(): void {
    this.subscription.add(
      this._checkoutStateService
        .productsInCheckoutCount$()
        .subscribe((count) => {
          this.productCount = count;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
