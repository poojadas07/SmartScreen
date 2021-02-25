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

@NgModule({
  declarations: [
    NavComponent,
    DashComponent,
    CardComponent,
    CountriesComponent,
    RegionsComponent,
    LocationsComponent],
  imports: [
    CommonModule,
    NavRoutingModule,
    ChartsModule,
    LayoutModule,
    MatToolbarModule,
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
    MatExpansionModule
  ]
})
export class NavModule {
}
