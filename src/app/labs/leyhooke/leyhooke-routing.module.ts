import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeyhookeComponent } from './leyhooke.component';

const routes: Routes = [{ path: '', component: LeyhookeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeyhookeRoutingModule { }
