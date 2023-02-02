import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvailableSalesDto, IngredientDto, ProductDto } from 'src/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PublicApiService {
  constructor(private http: HttpClient) {}

  getAvailableSales(): Observable<AvailableSalesDto> {
    return this.http.get<AvailableSalesDto>(`/api/sale/available`);
  }

  getProduct(productId: string): Observable<ProductDto> {
    return this.http.get<ProductDto>(`/api/product/${productId}`);
  }

  getIngredients(productId: string): Observable<IngredientDto[]> {
    return this.http.get<IngredientDto[]>(`/api/product/${productId}/ingredients`);
  }
}
