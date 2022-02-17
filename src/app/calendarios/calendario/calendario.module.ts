import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarioRoutingModule } from './calendario-routing.module';
import { CalendarioComponent } from './calendario.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import {MatTabsModule} from '@angular/material/tabs';
import { MyCalendarComponent } from '../myCalendar/myCalendar.component';
import { DemoUtilsModule } from '../utils/module';
import { CalendarCaidaLibreComponent } from '../calendarCaidaLibre/calendarCaidaLibre.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    CalendarioComponent,
    MyCalendarComponent,
    CalendarCaidaLibreComponent,
    
  ],
  imports: [
    CommonModule,
    CalendarioRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    DemoUtilsModule,
    MatTabsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CalendarioModule { }
