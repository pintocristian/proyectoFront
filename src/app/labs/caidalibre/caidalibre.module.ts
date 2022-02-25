import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownModule } from 'ngx-countdown';

import { CaidalibreRoutingModule } from './caidalibre-routing.module';
import { CaidalibreComponent } from './caidalibre.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    CaidalibreComponent
  ],
  imports: [
    CommonModule,
    CaidalibreRoutingModule,
    NgxChartsModule,
    CountdownModule
  ]
})
export class CaidalibreModule { }
