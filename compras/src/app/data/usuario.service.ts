import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUsuario } from './IUsuario';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  Guardar(Usuario: IUsuario) {
    console.log('Antes del servicio ', Usuario)  
    return this.http.post('https://localhost:5101/Usuario/Guardar', Usuario);
  }

  Login(data: any) {
    console.log('Antes del servicio ', data)  
    return this.http.post('https://localhost:5101/Usuario/Login', data);
  }

  GetWeather(): Promise<any> {
    return this.http.get<any>('https://localhost:5101/WeatherForecast/Get').toPromise();    
  } 

  UpdateUsuario(Usuario: IUsuario): Observable<any> {    
    return this.http.put('https://localhost:7127/Usuario/UpdateUsuario', Usuario);
  }

  DeleteUsuario(UsuarioId: Number): Observable<any> {    
    return this.http.delete('https://localhost:7127/Usuario/DeleteUsuario'+  "/" + UsuarioId);
  }

  GetAllUsuarios(): Promise<any> {
    return this.http.get<any>('https://localhost:7127/Usuario/GetAllUsuarios').toPromise();    
  } 

  GetUsuarioByLastNames(lastNames: string): Observable<any> {    
    return this.http.get('https://localhost:7127/Usuario/GetUsuarioByLastNames'+  "/" + lastNames);
  }

  GetUsuarioById(idUsuario: number): Observable<any> { 
    console.log("Capa services / GetUsuarioById con el id " + idUsuario);   
    return this.http.get('https://localhost:7127/Usuario/GetUsuarioById'+  "/" + idUsuario);
  }
}