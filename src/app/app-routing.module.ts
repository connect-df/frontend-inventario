import { WaitModule } from './wait/wait.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './home/home.module';
import { InventarioModule } from './inventario/inventario.module';
import { LeitorModule } from './leitor/leitor.module';
import { LocalModule } from './local/local.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { TipoModule } from './tipo/tipo.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthGuard } from './utility/app-guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'wait'
  },
  {
    path: 'wait',
    loadChildren: () => WaitModule,

  },
  {
    path: 'home',
    loadChildren: () => HomeModule,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    loadChildren: () => UsuarioModule,
    canActivate: [AuthGuard]
  },
  {
    path: 'itens',
    loadChildren: () => InventarioModule,
    canActivate: [AuthGuard]
  },
  {
    path: 'leitor',
    loadChildren: () => LeitorModule,
    canActivate: [AuthGuard]
  },
  {
    path: 'local',
    loadChildren: () => LocalModule,
    canActivate: [AuthGuard]
  },
  {
    path: 'tipo',
    loadChildren: () => TipoModule,
    canActivate: [AuthGuard]
  },
  {
    path: 'pessoa',
    loadChildren: () => PessoaModule,
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
