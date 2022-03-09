import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardsGuard } from './guards.guard';

const routes: Routes = [{
  path:'',
  redirectTo: '/login',
  pathMatch: 'full'
},
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'inicio', loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule),canActivate:[GuardsGuard] },
  { path: 'caidalibre', loadChildren: () => import('./labs/caidalibre/caidalibre.module').then(m => m.CaidalibreModule),canActivate:[GuardsGuard] },
  { path: 'leyhooke', loadChildren: () => import('./labs/leyhooke/leyhooke.module').then(m => m.LeyhookeModule),canActivate:[GuardsGuard] },
  { path: 'movparabolico', loadChildren: () => import('./labs/movparabolico/movparabolico.module').then(m => m.MovparabolicoModule),canActivate:[GuardsGuard] },
  { path: 'calendario', loadChildren: () => import('./calendarios/calendario/calendario.module').then(m => m.CalendarioModule),canActivate:[GuardsGuard] },
  { path: 'materias', loadChildren: () => import('./materias/materias.module').then(m => m.MateriasModule),canActivate:[GuardsGuard] },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
