import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProductDto, CreateSaleDto, ProductDto, SaleDto } from 'src/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PrivateApiService {
  constructor(private http: HttpClient) {}

  getAllSales(): Observable<{ count: number; sales: SaleDto[] }> {
    return this.http.get<{ count: number; sales: SaleDto[] }>(`/api/sale`);
  }

  deleteSale(id: string): Observable<void> {
    return this.http.delete<void>(`/api/sale/${id}`);
  }

  createSale(payload: CreateSaleDto): Observable<SaleDto> {
    return this.http.post<CreateSaleDto>(`/api/sale`, payload);
  }

  getProduct(id: string): Observable<ProductDto> {
    return this.http.get<ProductDto>(`/api/product/${id}`);
  }

  getProducts(): Observable<{ count: number; products: ProductDto[] }> {
    return this.http.get<{ count: number; products: ProductDto[] }>(`/api/product`);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`/api/product/${id}`);
  }

  createProduct(payload: CreateProductDto): Observable<ProductDto> {
    return this.http.post<ProductDto>(`/api/product`, payload);
  }

  updateProduct(id: string, payload: ProductDto): Observable<ProductDto> {
    return this.http.put<ProductDto>(`/api/product/${id}`, payload);
  }
}
