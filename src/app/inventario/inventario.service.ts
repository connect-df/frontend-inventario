import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Inventario } from './inventario';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  itemUrl: string = ''
  constructor( private http: HttpClient) {
      this.itemUrl = `${environment.apiURl}/produto`
   }

  listar() {
    return this.http.get<Inventario[]>(this.itemUrl);
  }

  getById(id: number): Observable<Inventario> {
    return this.http.get<Inventario>(`${this.itemUrl}/${id}`);
  }

  getByCode(codigo: string) {
    return this.http.get<Inventario>(`${this.itemUrl}/codigo/${codigo}`);
  }

  getByLocal(local: string): Observable<Inventario> {
    return this.http.get<Inventario>(`${this.itemUrl}/${local}`);
  }

  getIncluir(request: Inventario) {
    return this.http.post<Inventario>(this.itemUrl, request);
  }

  getAlterar(id: Number | null, request: Inventario) {
    return this.http.put<Inventario>(`${this.itemUrl}/${id}`, request);
  }

  getDelete(id: Number) {
    return this.http.delete<Inventario>(`${this.itemUrl}/${id}`);
  }
}
