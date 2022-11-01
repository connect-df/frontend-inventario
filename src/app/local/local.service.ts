import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Local } from './local';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
 public local!: Local;

  localUrl: string = '';
  constructor( private http: HttpClient) {
      this.localUrl = `${environment.apiURl}/local`
   }

   setLocal(local: Local){
    this.local = local;
   }

   getLocal(local: Local) {
   return this.local = local
  }
    
   listar() {
    return this.http.get<Local[]>(this.localUrl);
  }

  getById(id: number): Observable<Local> {
    return this.http.get<Local>(`${this.localUrl}/${id}`);
  }

  getIncluir(request: Local) {
    return this.http.post<Local>(this.localUrl, request);
  }

  getAlterar(id: Number | null, request: Local) {
    return this.http.put<Local>(`${this.localUrl}/${id}`, request);
  }

  getDelete(id: Number) {
    return this.http.delete<Local>(`${this.localUrl}/${id}`);
  }
}
