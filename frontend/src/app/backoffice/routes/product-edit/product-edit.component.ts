import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of, Subscription, switchMap } from 'rxjs';
import { ProductDto } from 'src/interfaces';
import { PrivateApiService } from '../../services/private-api.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
})
export class ProductEditComponent implements OnInit, OnDestroy {
  private subs: Subscription;

  loading: boolean = false;
  isNew: boolean = false;

  form: FormGroup;
  product?: ProductDto;

  constructor(
    private fb: FormBuilder,
    private api: PrivateApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.subs = new Subscription();
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['0.00', Validators.required],
      ingredients: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.paramMap
      .pipe(
        map((params) => params.get('id')),
        switchMap((id) => {
          if (id) {
            return this.api.getProduct(id);
          }
          return of(null);
        })
      )
      .subscribe({
        next: (data) => {
          if (data !== null) {
            this.isNew = false;
            this.product = data;
            this.form.patchValue(data);
          } else {
            this.isNew = true;
            this.ingredientArray.push(this.newIngredientGroup());
          }
          this.loading = false;
        },
        error: () => {
          this.router.navigate(['/backoffice/products']);
        },
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  get ingredientArray(): FormArray {
    return this.form.controls['ingredients'] as FormArray;
  }

  get ingredientsControl(): FormGroup[] {
    return this.ingredientArray.controls as FormGroup[];
  }

  addIngredient(): void {
    this.ingredientArray.push(this.newIngredientGroup());
  }

  removeIngredient(pos: number): void {
    this.ingredientArray.removeAt(pos);
  }

  onSubmit(): void {
    const data = { ...this.form.value };
    data.price = (data.price ?? 0).toString();

    const apiCall = this.isNew ? this.api.createProduct(data) : this.api.updateProduct(this.product!.id!, data);

    this.subs.add(
      apiCall.subscribe({
        next: () => {
          this.router.navigate(['/backoffice/products']);
        },
        error: () => {
          this.loading = false;
        },
      })
    );
  }

  private newIngredientGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      um: ['', Validators.required],
      qty: [1, Validators.min(1)],
    });
  }
}
