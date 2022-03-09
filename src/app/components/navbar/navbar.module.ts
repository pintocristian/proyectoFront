import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NavBarRoutingModule } from './navbar-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NavBarRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatDialogModule,
    MatButtonModule,
  ],
  declarations: [NavbarComponent],
  exports:[
    NavbarComponent
  ]
})
export class NavbarModule { }
