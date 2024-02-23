import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IComprador } from '../data/IComprador';

@Injectable({
  providedIn: 'root'
})
export class CompradorService {

  constructor(private http: HttpClient) { }

//   const headers = new HttpHeaders({
//     'Content-Type': 'application/json'  
// });

  Guardar(Comprador: IComprador): Promise<any> {
    console.log('Antes del servicio ', Comprador)  
    return this.http.post('https://localhost:7145/Comprador/Guardar', Comprador).toPromise();
  }

  Login(data: any): Promise<any> {
    console.log('Antes del servicio ', data)  
    return this.http.post('https://localhost:7145/Comprador/Login', data).toPromise();
  }

  GetWeather(): Promise<any> {
    return this.http.get<any>('https://localhost:7145/WeatherForecast/Get').toPromise();    
  } 

  UpdateComprador(Comprador: IComprador): Observable<any> {    
    return this.http.put('https://localhost:7127/Comprador/UpdateComprador', Comprador);
  }

  DeleteComprador(CompradorId: Number): Observable<any> {    
    return this.http.delete('https://localhost:7127/Comprador/DeleteComprador'+  "/" + CompradorId);
  }

  GetAllCompradors(): Promise<any> {
    return this.http.get<any>('https://localhost:7127/Comprador/GetAllCompradors').toPromise();    
  } 

  GetCompradorByLastNames(lastNames: string): Observable<any> {    
    return this.http.get('https://localhost:7127/Comprador/GetCompradorByLastNames'+  "/" + lastNames);
  }

  GetCompradorById(idComprador: number): Observable<any> { 
    console.log("Capa services / GetCompradorById con el id " + idComprador);   
    return this.http.get('https://localhost:7127/Comprador/GetCompradorById'+  "/" + idComprador);
  }
}
