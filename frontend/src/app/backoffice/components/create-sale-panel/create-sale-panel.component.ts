import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CreateSaleDto, ProductDto, SaleDto } from 'src/interfaces';
import { PrivateApiService } from '../../services/private-api.service';

@Component({
  selector: 'app-create-sale-panel',
  templateUrl: './create-sale-panel.component.html',
})
export class CreateSalePanelComponent implements OnDestroy {
  @Input() products: ProductDto[] = [];
  @Output() saleCreated = new EventEmitter<SaleDto>();

  private subs: Subscription;
  loading: boolean;
  form: FormGroup;
  errorMessage?: string;

  constructor(private fb: FormBuilder, private api: PrivateApiService) {
    this.subs = new Subscription();
    this.loading = false;
    this.form = this.fb.group({
      product_id: ['', Validators.required],
      qty: [1, Validators.min(1)],
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onSubmit(): void {
    this.loading = true;

    const payload: CreateSaleDto = {
      ...this.form.value,
    };

    this.subs.add(
      this.api.createSale(payload).subscribe({
        next: (sale) => {
          this.saleCreated.emit(sale);
          this.form.reset();
          this.loading = false;
        },
        error: () => {
          this.errorMessage = 'Something went wrong while trying to create the sale. Please try again.';
          this.loading = false;
        },
      })
    );
  }
}
