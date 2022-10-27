import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuComponent } from '../menu/menu.component';


import { InputTextareaModule } from 'primeng/inputtextarea';

import { ConfirmationService, MessageService } from 'primeng/api';
import { InventarioService } from 'src/app/inventario/inventario.service';
import { LocalService } from 'src/app/local/local.service';
import { PessoaService } from 'src/app/pessoa/pessoa.service';
import { TipoService } from 'src/app/tipo/tipo.service';
import { UsuarioService } from 'src/app/usuario/usuario.service';



@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PanelMenuModule,
    InputTextareaModule,
  ],
  exports: [
    MenuComponent,
  ],
  providers: [
    DatePipe,
    UsuarioService,
    TipoService,
    LocalService,
    PessoaService,
    InventarioService,

    MessageService,
    ConfirmationService,

  ]

})
export class CoreModule { }
