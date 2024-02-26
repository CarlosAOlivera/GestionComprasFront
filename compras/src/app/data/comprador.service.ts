import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IComprador } from '../data/IComprador';

@Injectable({
  providedIn: 'root'
})
export class CompradorService {

  private apiUrl = 'http://localhost:5101/Comprador'; // URL actualizada

  constructor(private http: HttpClient) { }

  Guardar(Comprador: IComprador): Promise<any> {
    return this.http.post(`${this.apiUrl}/Guardar`, Comprador).toPromise();
  }

  Login(data: any): Promise<any> {
    return this.http.post(`${this.apiUrl}/Login`, data).toPromise();
  }

  UpdateComprador(Comprador: IComprador): Observable<any> {    
    return this.http.put(`${this.apiUrl}/UpdateComprador`, Comprador);
  }

  DeleteComprador(CompradorId: number): Observable<any> {    
    return this.http.delete(`${this.apiUrl}/DeleteComprador/${CompradorId}`);
  }

  GetAllCompradors(): Promise<any> {
    return this.http.get<any>(`${this.apiUrl}/GetAllCompradors`).toPromise();    
  } 

  GetCompradorByLastNames(lastNames: string): Observable<any> {    
    return this.http.get(`${this.apiUrl}/GetCompradorByLastNames/${lastNames}`);
  }

  GetCompradorById(idComprador: number): Observable<any> {    
    return this.http.get(`${this.apiUrl}/GetCompradorById/${idComprador}`);
  }
}
