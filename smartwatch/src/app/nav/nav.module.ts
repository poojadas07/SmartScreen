import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { NavComponent } from './nav.component';
import { DashComponent } from './dash/dash.component';
import { CardComponent } from './component/card/card.component';
import { CountriesComponent } from './countries/countries.component';
import { RegionsComponent } from './regions/regions.component';
import { LocationsComponent } from './locations/locations.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
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
import { MatSelectModule } from '@angular/material/select';
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
import { ScreensComponent } from './screens/screens.component';
import { ClientAddComponent } from './client/client-add/client-add.component';
import { DepartmentAddComponent } from './department/department-add/department-add.component';
import { ScreensAddComponent } from './screens/screens-add/screens-add.component';
import { ComponentModule } from './component/component.module';
import {MatTreeModule} from '@angular/material/tree';
import { SettingsComponent } from './settings/settings.component';
import { InfoComponent } from './info/info.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TableComponent } from './component/table/table.component';
import { ScreenIdAddComponent } from './screens/screen-id-add/screen-id-add.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProfileAddComponent } from './profile/profile-add/profile-add.component';
import { ReportComponent } from './report/report.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    NavComponent,
    DashComponent,
    CardComponent,
    TableComponent,
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
    ScreensComponent,
    ClientAddComponent,
    DepartmentAddComponent,
    ScreensAddComponent,
    SettingsComponent,
    InfoComponent,
    ScreenIdAddComponent,
    ProfileAddComponent,
    ReportComponent,
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    NavRoutingModule,
    ChartsModule,
    MatPaginatorModule,
    MatTreeModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    LayoutModule,
    MatSortModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
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
    ComponentModule,
  ]
})
export class NavModule {
}
