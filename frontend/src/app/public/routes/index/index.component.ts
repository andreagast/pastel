import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductDto, SaleDto } from 'src/interfaces';
import { PublicApiService } from '../../services/public-api.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit, OnDestroy {
  @ViewChild('ciao') templateRef!: TemplateRef<any>;

  private subs: Subscription;
  loading: boolean = false;

  fresh: SaleDto[] = [];
  half: SaleDto[] = [];
  stale: SaleDto[] = [];
  products: ProductDto[] = [];

  constructor(private publicApi: PublicApiService, private router: Router) {
    this.subs = new Subscription();
  }

  ngOnInit(): void {
    this.loading = true;
    this.subs.add(
      this.publicApi.getAvailableSales().subscribe({
        next: (data) => {
          this.fresh = data.sale?.fresh ?? [];
          this.half = data.sale?.half ?? [];
          this.stale = data.sale?.stale ?? [];
          this.products = data.products ?? [];
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

  onSaleClick(sale: SaleDto): void {
    this.router.navigate(['/ingredients/', sale.product_id!]);
  }
}
