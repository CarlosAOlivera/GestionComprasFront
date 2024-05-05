import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../data/product.model';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  private apiUrl = 'http://localhost:5101/api/v1/Producto';

  constructor(private http: HttpClient) {}

 
  getMostSearchedProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/GetMasBuscados`);
  }

  getProductsByGender(paraSexo: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/GetBySexo/${paraSexo}`);
  }

  getByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/GetByName/${name}`);
  }

  search(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/Search`, {params: {query}});
  }

}