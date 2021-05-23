import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { NavComponent } from './nav.component';
import { DashComponent } from './dash/dash.component';
import { CardComponent } from './card/card.component';
import { CountriesComponent } from './countries/countries.component';
import { RegionsComponent } from './regions/regions.component';
import { LocationsComponent } from './locations/locations.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ChartsModule } from 'ng2-charts';
import { NavRoutingModule } from './nav-routing.module';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareComponent } from './share/share.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileComponent } from './profile/profile.component';
import { CountryAddComponent } from './countries/country-add/country-add.component';
import { RegionAddComponent } from './regions/region-add/region-add.component';
import { LocationAddComponent } from './locations/location-add/location-add.component';
import { ClientComponent } from './client/client.component';
import { DepartmentComponent } from './department/department.component';

@NgModule({
  declarations: [
    NavComponent,
    DashComponent,
    CardComponent,
    CountriesComponent,
    RegionsComponent,
    LocationsComponent,
    ShareComponent,
    ProfileComponent,
    CountryAddComponent,
    RegionAddComponent,
    LocationAddComponent,
    ClientComponent,
    DepartmentComponent,
  ],
  imports: [
    CommonModule,
    NavRoutingModule,
    ChartsModule,
    LayoutModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    ShareButtonsModule,
    FontAwesomeModule,
  ]
})
export class NavModule {
}
