import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  apiUrl = 'https://localhost:5101';

  constructor(private http: HttpClient) {}

  searchProducts(query: string): Observable<Product[]> {
    const url = `${this.apiUrl}/Product/Search`;
    return this.http.get<Product[]>(`${this.apiUrl}/Producto/Search`,{params: {query} });
  }

  searchMostSearchedProducts(paraSexo: string): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/Producto/GetMasBuscados/${paraSexo}`);
  }

  getMostSearchedProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/Producto/GetMasBuscados`);
  }
}