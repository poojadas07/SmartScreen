import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { ModalService } from 'src/app/service/modal.service';
import { CountryAddComponent } from '../countries/country-add/country-add.component';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  areas: any;

  bookForm: FormGroup;

  title: String;

  headers = ['Department' , 'Client' , 'Location' , 'Region' , 'Country'];
  headervalues = [];
  value: number;

  constructor(public formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog,
    private modalService: ModalService,) 
    {
      this.bookForm = this.formBuilder.group({
        searchvalue: [''],
      });
     }

  ngOnInit() {

    this.value = window.history.state.data;

    switch(this.value){
      case 0: this.title = 'Countries';
              this.apiService.fetchAllCountries().subscribe((res) => {
                this.areas = res;
              });
              break;
      case 1: this.title = 'Regions';
              for(let i=this.value; i>0; i--){
                this.headervalues.push(this.headers[this.headers.length-i]);
              }
              this.apiService.fetchAllRegions().subscribe((res) => {
                this.areas = res;
              });
              break;
      case 2: this.title = 'Locations';
              for(let i=this.value; i>0; i--){
                this.headervalues.push(this.headers[this.headers.length-i]);
              }
              this.apiService.fetchAllLocations().subscribe((res) => {
                this.areas = res;
              });
              break;
      case 3: this.title = 'Clients';
              for(let i=this.value; i>0; i--){
                this.headervalues.push(this.headers[this.headers.length-i]);
              }
              this.apiService.fetchAllClients().subscribe((res) => {
                this.areas = res;
              });
              break;
      case 4: this.title = 'Departments';
              for(let i=this.value; i>0; i--){
                this.headervalues.push(this.headers[this.headers.length-i]);
              }
              this.apiService.fetchAllDepartments().subscribe((res) => {
                this.areas = res;
              });
              break;
      case 5: this.title = 'Screens';
              for(let i=this.value; i>0; i--){
                this.headervalues.push(this.headers[this.headers.length-i]);
              }
              this.apiService.fetchAllScreens().subscribe((res) => {
                this.areas = res;
              });
              break;
    }

    console.log(window.history.state.data);
  }
    
  openConfirmModal(country) {
    this.modalService.openConfirmModal('Are you sure you want to do?', (answer: boolean) => {
      if (answer) {
        this.apiService.deleteCountry(country._id).subscribe((res) => {
          // alert(res.message);
  
          this.apiService.fetchAllCountries().subscribe((res) => {
            this.areas = res;
          });
  
        });
        return;
      }
    });
  }


  search() : any {
    // alert(searchvalue)

    // console.log(this.bookForm.value)
    this.apiService.fetchCountryByName(this.bookForm.value).subscribe((res) => {
      this.areas = res;
      // console.log(res);
    });
  }

  reset() : void {
    this.bookForm.reset();

    this.apiService.fetchAllCountries().subscribe((res) => {
      this.areas = res;
    });
  }
  
  editRow(country): void{
    this.openDialog(true , country);
  }

  add(): void {
    this.openDialog(false);
  }

  deleteRow(country){
    // console.log('hhh');

    this.openConfirmModal(country);
  }

  openDialog(isEdit: boolean, value = null): void {
    let dialogRef;
    if (isEdit == false){
      // console.log(isEdit);
      dialogRef = this.dialog.open(CountryAddComponent , {
        data: {dialogTitle: "Add Country"}
      });
    }
    else {
      // console.log(isEdit);
      dialogRef = this.dialog.open(CountryAddComponent ,{
        data: {dialogTitle: "Edit Country" , dialogText: value}
      });
    }

    dialogRef.afterClosed().subscribe(res => {
      // console.log('The dialog was closed');

      this.apiService.fetchAllCountries().subscribe((res) => {
        this.areas = res;
      });

    });
    
  }

}
