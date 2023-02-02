import { Component, EventEmitter, Input, Output } from '@angular/core';
import { parse, differenceInCalendarDays } from 'date-fns';
import { ProductDto, SaleDto } from 'src/interfaces';

@Component({
  selector: 'app-sale-list-panel',
  templateUrl: './sale-list-panel.component.html',
})
export class SaleListPanelComponent {
  @Input() sales: SaleDto[] = [];
  @Input() products: ProductDto[] = [];
  @Output() deleteClick = new EventEmitter<SaleDto>();

  getProductName(productId?: string): string {
    if (!productId) {
      return '';
    }

    const product = this.products.find((product) => product.id === productId);
    return !!product ? product.name! : productId;
  }

  getSaleDays(sale: SaleDto): number {
    if (!sale || !sale.production_date) {
      return 999;
    }
    const parsedDate = parse(sale.production_date, 'yyyy-MM-dd', Date.now());
    return differenceInCalendarDays(parsedDate, Date.now());
  }

  onDeleteClick(sale: SaleDto): void {
    this.deleteClick.emit(sale);
  }
}
