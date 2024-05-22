import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { IUsuario } from '../data/IUsuario';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:5101/api/Usuario';

  constructor(private http: HttpClient) { }

  Guardar(usuario: IUsuario): Observable<IUsuario> {
    return this.http.post<IUsuario>(`${this.apiUrl}/Guardar`, usuario)
      .pipe(
        catchError(this.handleError)
      );
  }

  Login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Login`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  UpdateUsuario(usuario: IUsuario): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateUsuario`, usuario)
      .pipe(
        catchError(this.handleError)
      );
  }

  DeleteUsuario(usuarioId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteUsuario/${usuarioId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  async GetAllUsuarios(): Promise<any> {
    try {
      return await this.http.get<any>(`${this.apiUrl}/GetAllUsuarios`).toPromise();
    } catch (error) {
      this.handleError(error as HttpErrorResponse);
    }
  }

  GetUsuarioByLastNames(lastNames: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetUsuarioByLastNames/${lastNames}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  GetUsuarioById(idUsuario: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetUsuarioById/${idUsuario}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  checkEmail(email: string): Observable<boolean> {
    const params = new HttpParams().set('email', email);
    return this.http.get<boolean>(`${this.apiUrl}/check-email`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  confirmEmail(token: string, email: string): Observable<any> {
    const params = new HttpParams().set('token', token).set('email', email);
    return this.http.get(`${this.apiUrl}/ConfirmarCorreo`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let userMessage = 'Something bad happened; please try again later.';
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
      if (error.status === 401) {  // Suponiendo que el backend devuelve 401 para errores de autenticación
        userMessage = 'Usuario o contraseña incorrecta';
      }
    }
    return throwError(() => new Error(userMessage));
  }
}
