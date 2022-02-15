import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeyhookeRoutingModule } from './leyhooke-routing.module';
import { LeyhookeComponent } from './leyhooke.component';


@NgModule({
  declarations: [
    LeyhookeComponent
  ],
  imports: [
    CommonModule,
    LeyhookeRoutingModule
  ]
})
export class LeyhookeModule { }
