import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovparabolicoComponent } from './movparabolico.component';

const routes: Routes = [{ path: '', component: MovparabolicoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovparabolicoRoutingModule { }
