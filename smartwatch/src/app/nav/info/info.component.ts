import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ModalService } from 'src/app/service/modal.service';
import { ClientAddComponent } from '../client/client-add/client-add.component';
import { CountryAddComponent } from '../countries/country-add/country-add.component';
import { DepartmentAddComponent } from '../department/department-add/department-add.component';
import { LocationAddComponent } from '../locations/location-add/location-add.component';
import { RegionAddComponent } from '../regions/region-add/region-add.component';
import { ScreensAddComponent } from '../screens/screens-add/screens-add.component';

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
    private modalService: ModalService,
    private router: Router,) 
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
    
  openConfirmModal(item) {

    switch(this.value){
      case 0: this.modalService.openConfirmModal('Are you sure you want to do?', (answer: boolean) => {
                if (answer) {
                  this.apiService.deleteCountry(item._id).subscribe((res) => {
                    // alert(res.message);
            
                    this.apiService.fetchAllCountries().subscribe((res) => {
                      this.areas = res;
                    });
            
                  });
                  return;
                }
              });
              break;
      case 1: this.modalService.openConfirmModal('Are you sure you want to do?', (answer: boolean) => {
                if (answer) {
                  this.apiService.deleteRegion(item._id).subscribe((res) => {
                    // alert(res.message);
            
                    this.apiService.fetchAllRegions().subscribe((res) => {
                      this.areas = res;
                    });
            
                  });
                  return;
                }
              });
              break;
      case 2: this.modalService.openConfirmModal('Are you sure you want to do?', (answer: boolean) => {
                if (answer) {
                  this.apiService.deleteLocation(item._id).subscribe((res) => {
                    // alert(res.message);
            
                    this.apiService.fetchAllLocations().subscribe((res) => {
                      this.areas = res;
                    });
            
                  });
                  return;
                }
              });
              break;
      case 3: this.modalService.openConfirmModal('Are you sure you want to do?', (answer: boolean) => {
                if (answer) {
                  this.apiService.deleteClient(item._id).subscribe((res) => {
                    // alert(res.message);
            
                    this.apiService.fetchAllClients().subscribe((res) => {
                      this.areas = res;
                    });
            
                  });
                  return;
                }
              });
              break;
      case 4: this.modalService.openConfirmModal('Are you sure you want to do?', (answer: boolean) => {
                if (answer) {
                  this.apiService.deleteDepartment(item._id).subscribe((res) => {
                    // alert(res.message);
            
                    this.apiService.fetchAllDepartments().subscribe((res) => {
                      this.areas = res;
                    });
            
                  });
                  return;
                }
              });
              break;
      case 5: this.modalService.openConfirmModal('Are you sure you want to do?', (answer: boolean) => {
                if (answer) {
                  this.apiService.deleteScreen(item._id).subscribe((res) => {
                    // alert(res.message);
            
                    this.apiService.fetchAllScreens().subscribe((res) => {
                      this.areas = res;
                    });
            
                  });
                  return;
                }
              });
              break;
    }
  }


  search() : any {
    
    switch(this.value){
      case 0: this.apiService.fetchCountryByName(this.bookForm.value).subscribe((res) => {
                this.areas = res;
              });
              break;
      case 1: this.apiService.fetchRegionByName(this.bookForm.value).subscribe((res) => {
                this.areas = res;
              });
              break;
      case 2: this.apiService.fetchLocationByName(this.bookForm.value).subscribe((res) => {
                this.areas = res;
              });
              break;
      case 3: this.apiService.fetchClientByName(this.bookForm.value).subscribe((res) => {
                this.areas = res;
              });
              break;
      case 4: this.apiService.fetchDepartmentByName(this.bookForm.value).subscribe((res) => {
                this.areas = res;
              });
              break;
      case 5: this.apiService.fetchScreenByName(this.bookForm.value).subscribe((res) => {
                this.areas = res;
              });
              break;
    }
  }

  reset() : void {
    this.bookForm.reset();

    switch(this.value){
      case 0: this.apiService.fetchAllCountries().subscribe((res) => {
                this.areas = res;
              });
              break;
      case 1: this.apiService.fetchAllRegions().subscribe((res) => {
                this.areas = res;
              });
              break;
      case 2: this.apiService.fetchAllLocations().subscribe((res) => {
                this.areas = res;
              });
              break;
      case 3: this.apiService.fetchAllClients().subscribe((res) => {
                this.areas = res;
              });
              break;
      case 4: this.apiService.fetchAllDepartments().subscribe((res) => {
                this.areas = res;
              });
              break;
      case 5: this.apiService.fetchAllScreens().subscribe((res) => {
                this.areas = res;
              });
              break;
    }
  }
  
  editRow(item): void{
    this.openDialog(true , item);
  }

  add(): void {
    this.openDialog(false);
  }

  deleteRow(item){
    // console.log('hhh');

    this.openConfirmModal(item);
  }

  openDialog(isEdit: boolean, value = null): void {
    let dialogRef;

    switch(this.value){
      case 0: if (isEdit == false){
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
              break;
      case 1: if (isEdit == false){
                // console.log(isEdit);
                dialogRef = this.dialog.open(RegionAddComponent , {
                  data: {dialogTitle: "Add Region"}
                });
              }
              else {
                // console.log(isEdit);
                dialogRef = this.dialog.open(RegionAddComponent ,{
                  data: {dialogTitle: "Edit Region" , dialogText: value}
                });
              }
              break;
      case 2: if (isEdit == false){
                // console.log(isEdit);
                dialogRef = this.dialog.open(LocationAddComponent , {
                  data: {dialogTitle: "Add Location"}
                });
              }
              else {
                // console.log(isEdit);
                dialogRef = this.dialog.open(LocationAddComponent ,{
                  data: {dialogTitle: "Edit Location" , dialogText: value}
                });
              }
              break;
      case 3: if (isEdit == false){
                // console.log(isEdit);
                dialogRef = this.dialog.open(ClientAddComponent , {
                  data: {dialogTitle: "Add Client"}
                });
              }
              else {
                // console.log(isEdit);
                dialogRef = this.dialog.open(ClientAddComponent ,{
                  data: {dialogTitle: "Edit Client" , dialogText: value}
                });
              }
              break;
      case 4: if (isEdit == false){
                // console.log(isEdit);
                dialogRef = this.dialog.open(DepartmentAddComponent , {
                  data: {dialogTitle: "Add Department"}
                });
              }
              else {
                // console.log(isEdit);
                dialogRef = this.dialog.open(DepartmentAddComponent ,{
                  data: {dialogTitle: "Edit Department" , dialogText: value}
                });
              }
              break;
      case 5: if (isEdit == false){
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
              break;
    }

    dialogRef.afterClosed().subscribe(res => {
      // console.log('The dialog was closed');

      switch(this.value){
        case 0: this.apiService.fetchAllCountries().subscribe((res) => {
                  this.areas = res;
                });
                break;
        case 1: this.apiService.fetchAllRegions().subscribe((res) => {
                  this.areas = res;
                });
                break;
        case 2: this.apiService.fetchAllLocations().subscribe((res) => {
                  this.areas = res;
                });
                break;
        case 3: this.apiService.fetchAllClients().subscribe((res) => {
                  this.areas = res;
                });
                break;
        case 4: this.apiService.fetchAllDepartments().subscribe((res) => {
                  this.areas = res;
                });
                break;
        case 5: this.apiService.fetchAllScreens().subscribe((res) => {
                  this.areas = res;
                });
                break;
      }

    });
    
  }

  back(): void{
    
    switch(this.value){
      case 0: this.router.navigate(["/nav/countries"]);
              break;
      case 1: this.router.navigate(["/nav/regions"]);
              break;
      case 2: this.router.navigate(["/nav/locations"]);
              break;
      case 3: this.router.navigate(["/nav/clients"]);
              break;
      case 4: this.router.navigate(["/nav/departments"]);
              break;
      case 5: this.router.navigate(["/nav/screens"]);
              break;
    }
  }

}
