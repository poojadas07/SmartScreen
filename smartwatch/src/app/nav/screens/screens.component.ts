import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { ModalService } from 'src/app/service/modal.service';
import { ScreenIdAddComponent } from './screen-id-add/screen-id-add.component';
import { ScreensAddComponent } from './screens-add/screens-add.component';


@Component({
  selector: 'app-screens',
  templateUrl: './screens.component.html',
  styleUrls: ['./screens.component.css']
})
export class ScreensComponent implements AfterViewInit {

  bookForm: FormGroup;
  screens: any;
  addnewCard = false;
  selectedItem: any;
  setItem: any;

  mySubscription: Subscription;
  
  setfilters = ['All', 'Faulty', 'Active'];

  messagelist: any;
  collapsed: boolean;
  screensSize: any;
  screenSize: any;
  activescreenSize: any;

  constructor(public formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog,
    private router: Router ,
    private modalService: ModalService,) 
    {
      this.bookForm = this.formBuilder.group({
        searchvalue: [''],
      }); 

      // this.mySubscription= interval(50000).subscribe((x =>{
      //       this.produce();
      //   }));

     }

  ngAfterViewInit() {

    this.apiService.fetchAllScreensPanel().subscribe((res) => {
      this.screens = res.body;
      this.screensSize = res.body.length;
      console.log(this.screens)
    });
    
    this.apiService.fetchAllScreens().subscribe((res) => {
      this.screenSize = res.body.length;
    });

    this.apiService.fetchAllActiveScreens().subscribe((res) => {
      this.activescreenSize = res.body.length;
    });
  }

  back(): void {
    this.router.navigate(["dashboard/departments"]);
  }

  add(): void {
    this.openDialog(false);
  }

  addScreenToPanel(screen: any): void {
    let dialogRef = this.dialog.open(ScreenIdAddComponent , {
        data: {dialogTitle: "Add Screen Id" , dialogText: screen}
      });
    

    dialogRef.afterClosed().subscribe(res => {
      // console.log('The dialog was closed');

      // this.apiService.fetchAllScreens().subscribe((res) => {
      //   this.screens = res;
      // });

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
    
            this.apiService.fetchAllScreensPanel().subscribe((res) => {
              this.screens = res.body;
              this.screensSize = res.body.length;
              console.log(this.screens)
            });

            this.apiService.fetchAllActiveScreens().subscribe((res) => {
              this.activescreenSize = res.body.length;
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
    if (isEdit == false){
      // console.log(isEdit);
      dialogRef = this.dialog.open(ScreensAddComponent , {
        data: {dialogTitle: "Add Screen"}
      });

      dialogRef.afterClosed().subscribe(res => {
        // console.log('The dialog was closed');

        this.apiService.fetchAllScreensPanel().subscribe((res) => {
          this.screens = res.body;
          this.screensSize = res.body.length;
          console.log(this.screens)
        });

        this.apiService.fetchAllActiveScreens().subscribe((res) => {
          this.activescreenSize = res.body.length;
        });
  
      });
    }
    else {
      // console.log(isEdit);
      dialogRef = this.dialog.open(ScreensAddComponent ,{
        data: {dialogTitle: "Edit Screen" , dialogText: value}
      });

      dialogRef.afterClosed().subscribe(res => {
        // console.log('The dialog was closed');
  
        this.apiService.fetchAllScreensPanel().subscribe((res) => {
          this.screens = res.body;
          this.screensSize = res.body.length;
          console.log(this.screens)
        });

        this.apiService.fetchAllActiveScreens().subscribe((res) => {
          this.activescreenSize = res.body.length;
        });

      });
    }

    
  }

  addCard(screen: any): void{
    this.addnewCard = !this.addnewCard;
    this.messagelist = screen;
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

  search() : any {
    
    this.apiService.fetchScreenByName(this.bookForm.value).subscribe((res) => {
      this.screens = res.body;
    });
  }

  reset() : void {
    this.bookForm.reset();

    this.apiService.fetchAllScreens().subscribe((res) => {
      this.screens = res.body;
    });
  }

  more(): void {
    this.collapsed = !this.collapsed;
  }
  
  produce(): void{
    this.apiService.produceMessages().subscribe((res) => {
      console.log(res.body);
    });
  }
}
