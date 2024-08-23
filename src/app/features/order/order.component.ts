import { Component, inject, OnInit } from '@angular/core';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { OrderStateService } from '../../core/services/order-state.service';
import { Order } from '../../core/models/order';
import { take } from 'rxjs';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [LoadingComponent, JsonPipe, CurrencyPipe, RouterModule],
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
  private readonly _orderStateService = inject(OrderStateService);

  public orders: Order[] = [];

  public routes = [
    {
      path: '/orders',
      label: 'Pedidos',
    },
    {
      path: '/payments',
      label: 'Pagamento',
    },
    {
      path: '/refunds',
      label: 'Reembolso e devoluções',
    },
  ];

  ngOnInit(): void {
    this._orderStateService
      .ordersAsObservable()
      .subscribe((orders) => (this.orders = orders));
  }
}
