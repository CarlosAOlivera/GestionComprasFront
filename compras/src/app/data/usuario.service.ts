import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUsuario } from './IUsuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:5101/Usuario'; // URL actualizada

  constructor(private http: HttpClient) { }

  Guardar(Usuario: IUsuario): Promise<any> {
    return this.http.post('http://localhost:5101/Usuario/Guardar', Usuario).toPromise();
  }

  Login(data: any): Promise<any> {
    return this.http.post('http://localhost:5101/Usuario/Login', data).toPromise();
  }

  UpdateUsuario(Usuario: IUsuario): Observable<any> {    
    return this.http.put('http://localhost:5101/Usuario/UpdateUsuario', Usuario);
  }

  DeleteUsuario(UsuarioId: number): Observable<any> {    
    return this.http.delete('http://localhost:5101/Usuario/DeleteUsuario/${UsuarioId}');
  }

  GetAllUsuarios(): Promise<any> {
    return this.http.get<any>('http://localhost:5101/Usuario/GetAllUsuarios').toPromise();    
  } 

  GetUsuarioByLastNames(lastNames: string): Observable<any> {    
    return this.http.get('http://localhost:5101/Usuario/GetUsuarioByLastNames/${lastNames}');
  }

  GetUsuarioById(idUsuario: number): Observable<any> {    
    return this.http.get('http://localhost:5101/Usuario/GetUsuarioById/${idUsuario}');
  }
}
