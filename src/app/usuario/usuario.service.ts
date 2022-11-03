import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';
// import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly API ='/assets/mock/usuario.json'

  constructor( private http: HttpClient) { }

  listar() {
    return this.http.get<Usuario[]>(this.API);
  }

  getById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API}/${id}`);
  }

  getIncluir(request: Usuario) {
    return this.http.post<Usuario>(this.API, request);
  }

  getAlterar(id: Number | null, request: Usuario) {
    return this.http.put<Usuario>(`${this.API}/${id}`, request);
  }

  getDelete(id: Number) {
    return this.http.delete<Usuario>(`${this.API}/${id}`);
  }
}
