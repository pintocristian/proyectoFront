import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { CalendarioRoutingModule } from './calendario-routing.module';
import { CalendarioComponent } from './calendario.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import {MatTabsModule} from '@angular/material/tabs';
import { DemoUtilsModule } from '../utils/module';
import { CalendarCaidaLibreComponent } from '../calendarCaidaLibre/calendarCaidaLibre.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CalendarLeyHookeComponent } from '../calendarLeyHooke/calendarLeyHooke.component';
import { CalendarMovParabolicoComponent } from '../calendarMovParabolico/calendarMovParabolico.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';


import localeEs from '@angular/common/locales/es';


registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    CalendarioComponent,
    CalendarCaidaLibreComponent,
    CalendarLeyHookeComponent,
    CalendarMovParabolicoComponent,
    
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
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    DemoUtilsModule,
    MatMenuModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatIconModule,
    NavbarModule
  ]
})
export class CalendarioModule { }
