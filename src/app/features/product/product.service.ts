import { Injectable } from '@angular/core';
import { Product } from '../../core/models/product';
import { delay, of, tap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Notebook',
      price: 4500.9,
      description:
        'O notebook combina desempenho e portabilidade com um processador de última geração, 16 GB de RAM e SSD de 512 GB para armazenamento rápido. Tela Full HD de 15,6 polegadas oferece excelente qualidade de imagem, ideal para trabalho e entretenimento. Bateria de longa duração.',
    },
    {
      id: 2,
      name: 'Celular',
      price: 1400.9,
      discount: 0.12,
    },
    {
      id: 3,
      name: 'Mouse',
      price: 233.9,
      discount: 0.16,
    },
    {
      id: 4,
      name: 'Volante',
      price: 1699.9,
    },
  ];
  public loadingProducts = false;

  public getProducts() {
    this.loadingProducts = true;
    return of(this.products).pipe(
      delay(1000),
      tap(() => (this.loadingProducts = false))
    );
  }
}
