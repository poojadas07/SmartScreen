import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{path : '', pathMatch: 'full', redirectTo: '/login'},
                        { path: 'dashboard', loadChildren: () => import('./nav/nav.module').then(m => m.NavModule), canActivate : [AuthGuard]},
                        { path: 'login', component: LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
