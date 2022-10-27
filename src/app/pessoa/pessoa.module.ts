import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoaRoutingModule } from './pessoa-routing.module';
import { PessoaListaComponent } from './pessoa-lista/pessoa-lista.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { PessoaComponent } from './pessoa/pessoa.component';


@NgModule({
  declarations: [
    PessoaComponent,
    PessoaListaComponent
  ],
  imports: [
    CommonModule,
    PessoaRoutingModule,

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
export class PessoaModule { }
