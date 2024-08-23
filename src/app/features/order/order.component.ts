import { Component } from '@angular/core';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: './order.component.html',
})
export class OrderComponent {}
