import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { PublicApiService } from 'src/app/public/services/public-api.service';
import { IngredientDto, ProductDto } from 'src/interfaces';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
})
export class IngredientsComponent implements OnInit, OnDestroy {
  private subs: Subscription;

  loading: boolean = false;
  product?: ProductDto;

  constructor(private publicApi: PublicApiService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.subs = new Subscription();
  }

  ngOnInit(): void {
    this.loading = true;
    this.subs.add(
      this.activatedRoute.params.pipe(switchMap((params) => this.publicApi.getProduct(params['id']))).subscribe({
        next: (product) => {
          this.product = product;
          this.loading = false;
        },
        error: (e) => {
          console.error(e);
          this.router.navigate(['/']);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
