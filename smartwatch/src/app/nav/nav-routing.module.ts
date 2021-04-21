import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { DashComponent } from './dash/dash.component';
import { LocationsComponent } from './locations/locations.component';
import { NavComponent } from './nav.component';
import { ProfileComponent } from './profile/profile.component';
import { RegionsComponent } from './regions/regions.component';

const routes: Routes = [ {path: '', component: NavComponent, children: [
                            {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
                            {path: 'dashboard',  component: DashComponent},
                            { path: 'countries', component: CountriesComponent },
                            { path: 'regions', component: RegionsComponent},
                            { path: 'locations', component: LocationsComponent},
                            { path: 'profile', component: ProfileComponent}]}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavRoutingModule {
}
