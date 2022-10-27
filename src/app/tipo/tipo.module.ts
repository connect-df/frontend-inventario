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

import { TipoListaComponent } from './tipo-lista/tipo-lista.component';
import { TipoRoutingModule } from './tipo-routing.module';
import { TipoComponent } from './tipo/tipo.component';


@NgModule({
  declarations: [
    TipoComponent,
    TipoListaComponent
  ],
  imports: [
    CommonModule,
    TipoRoutingModule,
   
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
export class TipoModule { }
