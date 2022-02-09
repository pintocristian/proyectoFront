import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DemoUtilsModule } from '../calendario/utils/module';

@NgModule({
  declarations: [
    InicioComponent,
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    MatDialogModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    DemoUtilsModule
  ]
})
export class InicioModule { }
