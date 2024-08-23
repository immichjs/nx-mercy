import { NgClass } from '@angular/common';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [NgClass],
  templateUrl: './loading.component.html',
})
export class LoadingComponent {
  @Input() custom?: string = '';
}
