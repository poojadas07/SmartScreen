import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {MatDialog} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ShareComponent } from './share/share.component';
import { ModalService } from '../service/modal.service';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private modalService: ModalService,
    private router: Router) {}

  openDialog() {
    this.dialog.open(ShareComponent);
  }

  menuItems = ['countries', 'regions' , 'locations' , 'clients' , 'departments' , 'screens'];

  panelOpenState = false;

  logout(): void {
    this.modalService.openConfirmModal('Are you sure you want to exit?', (answer: boolean) => {
      if (answer) {
        this.router.navigate(["login"]);
      }
    });
  }

}
