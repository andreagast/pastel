import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { ProductDto, SaleDto } from 'src/interfaces';
import { PrivateApiService } from '../../services/private-api.service';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
})
export class SaleListComponent implements OnInit, OnDestroy {
  private subs: Subscription;
  loading: boolean = false;

  products: ProductDto[];
  sales: SaleDto[];

  constructor(private api: PrivateApiService) {
    this.subs = new Subscription();
    this.products = [];
    this.sales = [];
  }

  ngOnInit(): void {
    this.loading = true;
    this.subs.add(
      forkJoin([this.api.getProducts(), this.api.getAllSales()]).subscribe({
        next: ([products, sales]) => {
          this.products = products.products;
          this.sales = sales.sales;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  refreshSale(): void {
    this.loading = true;
    this.subs.add(
      this.api.getAllSales().subscribe({
        next: (sales) => {
          this.sales = sales.sales;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      })
    );
  }

  onDeleteSale(sale: SaleDto): void {
    if (!sale || !sale.id) {
      return;
    }
    this.loading = true;
    this.api.deleteSale(sale.id).subscribe({
      next: () => {
        this.refreshSale();
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
