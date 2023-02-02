import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductDto } from 'src/interfaces';
import { PrivateApiService } from '../../services/private-api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit, OnDestroy {
  private subs: Subscription;
  loading: boolean = false;

  products: ProductDto[] = [];

  constructor(private api: PrivateApiService) {
    this.subs = new Subscription();
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onDeleteClick(product: ProductDto): void {
    if (!product || !product.id) {
      return;
    }

    this.loading = true;
    this.subs.add(
      this.api.deleteProduct(product.id).subscribe({
        next: () => {
          this.loadData();
        },
        error: () => {
          this.loading = false;
        },
      })
    );
  }

  private loadData(): void {
    this.loading = true;
    this.subs.add(
      this.api.getProducts().subscribe({
        next: (response) => {
          this.products = response.products;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      })
    );
  }
}
