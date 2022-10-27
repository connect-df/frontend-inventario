import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaListaComponent } from './pessoa-lista/pessoa-lista.component';
import { PessoaComponent } from './pessoa/pessoa.component';

const routes: Routes = [
  {
    path: '',
    component: PessoaListaComponent
  },
  {
    path: 'novo',
    component: PessoaComponent
  },
  {
    path: ':id',
    component: PessoaComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoaRoutingModule { }
