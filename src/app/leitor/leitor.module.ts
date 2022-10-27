import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ZXingScannerModule } from '@zxing/ngx-scanner';

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
  ]
})
export class LeitorModule { }
