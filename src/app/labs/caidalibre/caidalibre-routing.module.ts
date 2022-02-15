import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaidalibreComponent } from './caidalibre.component';

const routes: Routes = [{ path: '', component: CaidalibreComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaidalibreRoutingModule { }
