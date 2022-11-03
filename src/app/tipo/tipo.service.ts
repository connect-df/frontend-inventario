import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tipo } from './tipo';


@Injectable({
  providedIn: 'root'
})
export class TipoService {

  tipoUrl: string = ''
  
  constructor( private http: HttpClient) {
      this.tipoUrl = `${environment.apiURl}/tipo`
   }

  listar() {
    return this.http.get<Tipo[]>(this.tipoUrl);
  }

  getById(id: number): Observable<Tipo> {
    return this.http.get<Tipo>(`${this.tipoUrl}/${id}`);
  }

  getIncluir(request: Tipo) {
    return this.http.post<Tipo>(this.tipoUrl, request);
  }

  getAlterar(id: Number | null, request: Tipo) {
    return this.http.put<Tipo>(`${this.tipoUrl}/${id}`, request);
  }

  getDelete(id: Number) {
    return this.http.delete<Tipo>(`${this.tipoUrl}/${id}`);
  }
}
