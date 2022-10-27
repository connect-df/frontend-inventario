import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './home/home.module';
import { InventarioModule } from './inventario/inventario.module';
import { LeitorModule } from './leitor/leitor.module';
import { LocalModule } from './local/local.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { TipoModule } from './tipo/tipo.module';
import { UsuarioModule } from './usuario/usuario.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: () => HomeModule,
  },
  {
    path: 'usuarios',
    loadChildren: () => UsuarioModule,
  },
  {
    path: 'itens',
    loadChildren: () => InventarioModule,
  },
  {
    path: 'leitor',
    loadChildren: () => LeitorModule,
  },
  {
    path: 'local',
    loadChildren: () => LocalModule,
  },
  {
    path: 'tipo',
    loadChildren: () => TipoModule,
  },
  {
    path: 'pessoa',
    loadChildren: () => PessoaModule,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
