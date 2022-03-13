import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownModule } from 'ngx-countdown';

import { CaidalibreRoutingModule } from './caidalibre-routing.module';
import { CaidalibreComponent } from './caidalibre.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgChartsModule } from 'ng2-charts';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatMenuModule } from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { MatTabsModule } from '@angular/material/tabs';



@NgModule({
  declarations: [
    CaidalibreComponent
  ],
  imports: [
    CommonModule,
    CaidalibreRoutingModule,
    NgxChartsModule,
    CountdownModule,
    NgChartsModule,
    MatDialogModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatIconModule,
    NavbarModule,
    MatTabsModule,
  ]
})
export class CaidalibreModule { }
