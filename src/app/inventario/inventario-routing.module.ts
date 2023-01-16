import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioListaComponent } from './inventario-lista/inventario-lista.component';
import { InventarioComponent } from './inventario/inventario.component';

const routes: Routes = [
  {
    path: '',
    component: InventarioListaComponent
  },
  {
    path: 'novo',
    component: InventarioComponent
  },
   {
    path: ':id',
    component: InventarioComponent
  },
  {
    path: 'codigo/:codigo',
    component: InventarioComponent
  },
  {
    path: 'local/:local',
    component: InventarioListaComponent
  },
  {
    path: 'local/:local/:id',
    component: InventarioListaComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
