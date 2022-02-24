import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownModule } from 'ngx-countdown';

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
    NgxChartsModule,
    CountdownModule
  ]
})
export class LeyhookeModule { }
