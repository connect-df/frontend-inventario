import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';

import { UsuarioListaComponent } from './usuario-lista/usuario-lista.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario/usuario.component';


@NgModule({
  declarations: [
    UsuarioListaComponent,
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,

    FormsModule,
    TableModule,
    InputTextModule,
    InputMaskModule,
    InputNumberModule,
    DropdownModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    MessageModule,
    MessagesModule,
    PanelModule,
    
  ]
})
export class UsuarioModule { }
