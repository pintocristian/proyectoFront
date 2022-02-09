import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaidalibreRoutingModule } from './caidalibre-routing.module';
import { CaidalibreComponent } from './caidalibre.component';


@NgModule({
  declarations: [
    CaidalibreComponent
  ],
  imports: [
    CommonModule,
    CaidalibreRoutingModule
  ]
})
export class CaidalibreModule { }
