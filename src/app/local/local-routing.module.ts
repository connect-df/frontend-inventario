import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalListaComponent } from './local-lista/local-lista.component';
import { LocalComponent } from './local/local.component';

const routes: Routes = [
  {
    path: '',
    component: LocalListaComponent
  },
  {
    path: 'novo',
    component: LocalComponent
  },
  {
    path: ':id',
    component: LocalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalRoutingModule { }
