import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeitorComponent } from './leitor/leitor.component';

const routes: Routes = [
  {
    path: '',
    component: LeitorComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeitorRoutingModule { }
