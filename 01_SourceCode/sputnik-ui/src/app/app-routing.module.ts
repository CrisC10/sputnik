import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guard/auth.guard';
import {AuthChildGuard} from './guard/auth-child.guard';

const routes: Routes = [

  { path: '', loadChildren: './views/dashboard/dashboard.module#MainModule', canActivate: [AuthGuard], canActivateChild: [AuthChildGuard]},
  { path: 'dashboard', loadChildren: './views/dashboard/dashboard.module#MainModule'},
  { path: 'login', loadChildren: './views/login/login.module#LoginModule'},
  { path: '**', redirectTo: '', canActivateChild: [AuthChildGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
