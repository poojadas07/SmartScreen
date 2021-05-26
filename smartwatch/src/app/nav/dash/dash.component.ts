import { Component, OnInit } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  // dashboard.component.js
cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
   map(({ matches }) => {
     if (matches) {
       return {
         columns: 1,
         miniCard: { cols: 1, rows: 1 },
         chart: { cols: 1, rows: 2 },
         table: { cols: 1, rows: 4 },
       };
     }

    return {
       columns: 4,
       miniCard: { cols: 1, rows: 1 },
       chart: { cols: 2, rows: 2 },
       table: { cols: 4, rows: 4 },
     };
   })
 );

  constructor(private breakpointObserver: BreakpointObserver,
    private apiService: ApiService,) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    
  menuItems = ['countries', 'regions' , 'locations' , 'client' , 'departments' , 'screens'];

  panelOpenState = false;
  screens: Observable<any>;

  ngOnInit(): void {

    this.bindPanelData();

  }

  bindPanelData(): void {
    this.apiService.fetchAllScreens().subscribe((res) => {
      this.screens = res;
      // this.screensSize = res.length;
      console.log(res);

      for (let i = 0; i < res.length; i++) {
        this.apiService.fetchPanelByScreen(this.screens[i].screenId).subscribe((res) => {
          this.screens[i].panels = res;

          console.log(res);
          for (let j = 0; j < this.screens[i].panels.length; j++) {
            this.screens[i].panels[j].index = j+1;
          }
        });
      }
    });
  }

  getColor(panel) {
    if (panel.currentValue == null) {
      return '#d3d3d3';
    }
    else if (panel.currentValue == '0') {
      return '#e13026'; // Red Accent color
    } else {
      return '#67bf40' // Green Accent Color
    }
  }

}
