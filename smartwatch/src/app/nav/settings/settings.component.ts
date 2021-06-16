import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ModalService } from 'src/app/service/modal.service';
import { ScreenIdAddComponent } from '../screens/screen-id-add/screen-id-add.component';
import { ScreensAddComponent } from '../screens/screens-add/screens-add.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  bookForm: FormGroup;
  screen: any;
  addnewCard = false;

  collapsed: boolean;
  screensSize: any;
  screenId: string;
  activescreenSize: any;

  constructor(public formBuilder: FormBuilder,
    private activatedRout: ActivatedRoute,
    private apiService: ApiService,
    public dialog: MatDialog,
    private router: Router ,
    private modalService: ModalService,) 
    { }

  ngOnInit() {

    this.screenId = this.activatedRout.snapshot.paramMap.get("id");
    console.log(this.screenId);

    this.apiService.fetchAllScreens().subscribe((res) => {
      this.screensSize = res.length;
    });

    this.apiService.fetchAllActiveScreens().subscribe((res) => {
      this.activescreenSize = res.length;
    });

    this.apiService.fetchScreensPanelByScreenId(this.screenId).subscribe((res) => {
      this.screen = res;
      console.log(this.screen);
    });
  }

  addScreenToPanel(screen: any): void {
    let dialogRef = this.dialog.open(ScreenIdAddComponent , {
        data: {dialogTitle: "Add Screen Id" , dialogText: screen}
      });
    

    dialogRef.afterClosed().subscribe(res => {

    });
  }

  info(): void{
    this.router.navigate(["dashboard/info"], { state: { data: 5 } });
  }

  delete(screen){
    this.openConfirmModal(screen);
  }

  openConfirmModal(screen) {

    this.modalService.openConfirmModal('Are you sure you want to do?', (answer: boolean) => {
        if (answer) {
          this.apiService.deleteScreen(screen._id).subscribe((res) => {
    
            this.apiService.fetchScreensPanelByScreenId(this.screenId).subscribe((res) => {
              this.screen = res;
              console.log(this.screen)
            });
    
          });
          return;
        }
      });
  }

  edit(screen): void{
    this.openDialog(true , screen);
  }

  openDialog(isEdit: boolean, value = null): void {
    let dialogRef;
    dialogRef = this.dialog.open(ScreensAddComponent ,{
      data: {dialogTitle: "Edit Screen" , dialogText: value}
    });

    dialogRef.afterClosed().subscribe(res => {
      // console.log('The dialog was closed');

      this.apiService.fetchScreensPanelByScreenId(this.screenId).subscribe((res) => {
        this.screen = res;
        console.log(this.screen)
      });
    });
  }

  addCard(): void{
    this.addnewCard = !this.addnewCard;
  }

  getColor(panel) {
    if (panel.current_value == '-1') {
      return '#F1C40F'; // Idle situation
    }
    else if (panel.current_value == '1') {
      return '#FA1A03'; // Red Accent color
    }
    else if (panel.current_value == '2') {
      return '#2ECC71' // Green Accent Color
    }
    else {
      return 'lightgrey';
    }
  }

}
