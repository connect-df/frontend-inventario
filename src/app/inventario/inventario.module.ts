import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventarioRoutingModule } from './inventario-routing.module';
import { InventarioComponent } from './inventario/inventario.component';
import { InventarioListaComponent } from './inventario-lista/inventario-lista.component';
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


@NgModule({
  declarations: [
    InventarioComponent,
    InventarioListaComponent,
  ],
  imports: [
    CommonModule,
    InventarioRoutingModule,

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
export class InventarioModule { }
