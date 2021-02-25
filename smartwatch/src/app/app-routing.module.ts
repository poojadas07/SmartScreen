import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{path : '', pathMatch: 'full', redirectTo: '/login'},
                        { path: 'nav', loadChildren: () => import('./nav/nav.module').then(m => m.NavModule)},
                        { path: 'login', component: LoginComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
