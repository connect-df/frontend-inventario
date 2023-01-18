import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WaitRoutingModule } from './wait-routing.module';
import { WaitComponent } from './wait.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    WaitComponent
  ],
  imports: [
    CommonModule,
    WaitRoutingModule,
    ButtonModule
  ]
})
export class WaitModule { }
