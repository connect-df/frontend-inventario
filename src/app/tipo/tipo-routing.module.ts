import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoListaComponent } from './tipo-lista/tipo-lista.component';
import { TipoComponent } from './tipo/tipo.component';

const routes: Routes = [
  {
    path: '',
    component: TipoListaComponent
  },
  {
    path: 'novo',
    component: TipoComponent
  },
  {
    path: ':id',
    component: TipoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoRoutingModule { }
