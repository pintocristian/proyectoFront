import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MateriasRoutingModule } from './materias-routing.module';
import { MateriasComponent } from './materias.component';


@NgModule({
  declarations: [
    MateriasComponent
  ],
  imports: [
    CommonModule,
    MateriasRoutingModule,
    MatCardModule
  ]
})
export class MateriasModule { }
