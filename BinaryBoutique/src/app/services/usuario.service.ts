import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IUsuario } from '../data/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:5101/api/Usuario';

  constructor(private http: HttpClient) { }

  Guardar(usuario: IUsuario): Observable<IUsuario> {
    return this.http.post<IUsuario>(`${this.apiUrl}/Guardar`, usuario);
  }

  // Make sure to correct all methods similar to the above
  Login(data: any) {
    return this.http.post(`${this.apiUrl}/Login`, data);
  }

  UpdateUsuario(usuario: IUsuario): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateUsuario`, usuario);
  }

  DeleteUsuario(usuarioId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteUsuario/${usuarioId}`);
  }

  GetAllUsuarios(): Promise<any> {
    return this.http.get<any>(`${this.apiUrl}/GetAllUsuarios`).toPromise();
  }

  GetUsuarioByLastNames(lastNames: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetUsuarioByLastNames/${lastNames}`);
  }

  GetUsuarioById(idUsuario: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetUsuarioById/${idUsuario}`);
  }

  checkEmail(email: string): Observable<boolean> {
    const params = new HttpParams().set('email', email);
    return this.http.get<boolean>(`${this.apiUrl}/check-email`, { params });
  }

  confirmEmail(token: string, email: string): Observable<any> {
   return this.http.get(`${this.apiUrl}/ConfirmarCorreo`, { params: { token, email }});
  }
}
