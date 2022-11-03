import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';

import { LeitorRoutingModule } from './leitor-routing.module';
import { LeitorComponent } from './leitor/leitor.component';


@NgModule({
  declarations: [
    LeitorComponent
  ],
  imports: [
    CommonModule,
    LeitorRoutingModule,
    ZXingScannerModule,
    ConfirmDialogModule,
    MessageModule,
    MessagesModule,


  ]
})
export class LeitorModule { }
