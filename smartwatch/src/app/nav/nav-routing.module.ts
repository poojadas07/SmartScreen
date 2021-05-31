import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ClientComponent } from './client/client.component';
import { CountriesComponent } from './countries/countries.component';
import { DashComponent } from './dash/dash.component';
import { DepartmentComponent } from './department/department.component';
import { InfoComponent } from './info/info.component';
import { LocationsComponent } from './locations/locations.component';
import { NavComponent } from './nav.component';
import { ProfileComponent } from './profile/profile.component';
import { RegionsComponent } from './regions/regions.component';
import { ScreensComponent } from './screens/screens.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [ {path: '', component: NavComponent, children: [
                            {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
                            {path: 'dashboard',  component: DashComponent},
                            { path: 'countries', component: CountriesComponent },
                            { path: 'regions', component: RegionsComponent},
                            { path: 'locations', component: LocationsComponent},
                            { path: 'clients', component: ClientComponent},
                            { path: 'departments', component: DepartmentComponent},
                            { path: 'screens', component: ScreensComponent},
                            { path: 'profile', component: ProfileComponent},
                            { path: 'settings', component: SettingsComponent},
                            { path: 'info', component: InfoComponent}]}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavRoutingModule {
}
