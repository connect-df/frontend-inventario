import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pessoa } from './pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
 
  pessoaUrl: string = '';
  constructor( private http: HttpClient) {
      this.pessoaUrl = `${environment.apiURl}/pessoa`
   }
  listar() {
    return this.http.get<Pessoa[]>(this.pessoaUrl);
  }
 
  getById(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.pessoaUrl}/${id}`);
  }

  getIncluir(request: Pessoa) {
    return this.http.post<Pessoa>(this.pessoaUrl, request);
  }

  getAlterar(id: Number | null, request: Pessoa) {
    return this.http.put<Pessoa>(`${this.pessoaUrl}/${id}`, request);
  }

  getDelete(id: Number) {
    return this.http.delete<Pessoa>(`${this.pessoaUrl}/${id}`);
  }
}
