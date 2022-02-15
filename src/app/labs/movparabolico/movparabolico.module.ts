import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovparabolicoRoutingModule } from './movparabolico-routing.module';
import { MovparabolicoComponent } from './movparabolico.component';


@NgModule({
  declarations: [
    MovparabolicoComponent
  ],
  imports: [
    CommonModule,
    MovparabolicoRoutingModule
  ]
})
export class MovparabolicoModule { }
