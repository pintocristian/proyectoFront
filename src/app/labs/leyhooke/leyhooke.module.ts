import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeyhookeRoutingModule } from './leyhooke-routing.module';
import { LeyhookeComponent } from './leyhooke.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    LeyhookeComponent
  ],
  imports: [
    CommonModule,
    LeyhookeRoutingModule,
    NgxChartsModule
  ]
})
export class LeyhookeModule { }
