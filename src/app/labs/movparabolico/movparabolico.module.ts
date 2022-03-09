import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovparabolicoRoutingModule } from './movparabolico-routing.module';
import { MovparabolicoComponent } from './movparabolico.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgChartsModule } from 'ng2-charts';
import { CountdownModule } from 'ngx-countdown';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';

@NgModule({
  declarations: [
    MovparabolicoComponent
  ],
  imports: [
    CommonModule,
    MovparabolicoRoutingModule,
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
    NavbarModule
  ]
})
export class MovparabolicoModule { }
