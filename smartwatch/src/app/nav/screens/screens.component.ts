import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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

  setfilters = ['All', 'Faulty', 'Active'];

  messagelist: any;

  constructor(public formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog,
    private router: Router ,
    private modalService: ModalService,) 
    {
      this.bookForm = this.formBuilder.group({
        searchvalue: [''],
      }); 

     }

  ngAfterViewInit() {

    this.apiService.fetchAllScreens().subscribe((res) => {
      this.screens = res;
    });

    this.apiService.fetchAllCountries().subscribe((res) => {
      this.messagelist = res;
    });
  }

  back(): void {
    this.router.navigate(["nav/departments"]);
  }

  add(): void {
    this.openDialog(false);
  }

  addScreenToPanel(): void {
    let dialogRef = this.dialog.open(ScreenIdAddComponent , {
        data: {dialogTitle: "Add Screen Id"}
      });
    

    dialogRef.afterClosed().subscribe(res => {
      // console.log('The dialog was closed');

      this.apiService.fetchAllScreens().subscribe((res) => {
        this.screens = res;
      });

    });
  }

  info(): void{
    this.router.navigate(["nav/info"], { state: { data: 5 } });
  }

  delete(screen){
    // console.log('hhh');

    this.openConfirmModal(screen);
  }

  openConfirmModal(screen) {

    this.modalService.openConfirmModal('Are you sure you want to do?', (answer: boolean) => {
        if (answer) {
          this.apiService.deleteScreen(screen._id).subscribe((res) => {
            // alert(res.message);
    
            this.apiService.fetchAllScreens().subscribe((res) => {
              this.screens = res;
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
    }
    else {
      // console.log(isEdit);
      dialogRef = this.dialog.open(ScreensAddComponent ,{
        data: {dialogTitle: "Edit Screen" , dialogText: value}
      });
    }

    dialogRef.afterClosed().subscribe(res => {
      // console.log('The dialog was closed');

      this.apiService.fetchAllScreens().subscribe((res) => {
        this.screens = res;
      });

    });
    
  }

  addCard(): void{
    this.addnewCard = !this.addnewCard;
  }

  search() : any {
    
    this.apiService.fetchScreenByName(this.bookForm.value).subscribe((res) => {
      this.screens = res;
    });
  }

  reset() : void {
    this.bookForm.reset();

    this.apiService.fetchAllScreens().subscribe((res) => {
      this.screens = res;
    });
  }

  
}
