import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductDto, SaleDto } from 'src/interfaces';

@Component({
  selector: 'app-sale-display',
  templateUrl: './sale-display.component.html',
  styleUrls: ['./sale-display.component.scss'],
})
export class SaleDisplayComponent {
  @Input() sale?: SaleDto;
  @Input() products: ProductDto[] = [];
  @Input() priceType: 'full' | 'half' | 'stale' = 'full';
  @Output() saleClick = new EventEmitter<SaleDto>();

  onClick(): void {
    if (!this.sale) {
      return;
    }
    this.saleClick.emit(this.sale!);
  }

  get productName(): string {
    if (!this.sale || !this.sale.product_id) {
      return '...';
    }
    const product = this.products.find((p) => p.id === this.sale?.product_id);
    return !!product && !!product.name ? product.name : this.sale.product_id!;
  }

  get price(): string {
    if (!this.sale || !this.sale.product_id) {
      return '0,00';
    }
    const product = this.products.find((p) => p.id === this.sale?.product_id);
    if (!product) {
      return '0,00';
    }
    let price = parseFloat(product.price!);

    if (this.priceType === 'stale') {
      price = price * 0.2;
    } else if (this.priceType === 'half') {
      price = price * 0.8;
    }

    return price.toFixed(2);
  }
}
