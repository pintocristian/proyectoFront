import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarioRoutingModule } from './calendario-routing.module';
import { CalendarioComponent } from './calendario.component';
import { MyCalendarComponent } from '../myCalendar/myCalendar.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DemoUtilsModule } from '../utils/module';

import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    CalendarioComponent,
    MyCalendarComponent
  ],
  imports: [
    CommonModule,
    CalendarioRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    DemoUtilsModule,
    MatTabsModule
  ]
})
export class CalendarioModule { }
