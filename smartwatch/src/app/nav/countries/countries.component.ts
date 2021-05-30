import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import {MatDialog} from '@angular/material/dialog';
import { CountryAddComponent } from './country-add/country-add.component';
import { ModalService } from 'src/app/service/modal.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries: any;

  bookForm: FormGroup;

  constructor(public formBuilder: FormBuilder,private apiService: ApiService,
    public dialog: MatDialog,
    private modalService: ModalService) 
    {
      this.bookForm = this.formBuilder.group({
        searchvalue: [''],
      })
     }

  ngOnInit() {

    this.apiService.fetchAllCountries().subscribe((res) => {
        this.countries = res;
    });
  }

  openInfoModal() {
    this.modalService.openInfoModal('Hello Info');
  }

  openWarningModal() {
    this.modalService.openWarningModal('Are you sure ??');
    console.log(2);
  }

  openErrorModal() {
    this.modalService.openErrorModal('Hello Error');
  }

  openConfirmModal(country) {
    this.modalService.openConfirmModal('Are you sure you want to do?', (answer: boolean) => {
      if (answer) {
        this.apiService.deleteCountry(country._id).subscribe((res) => {
          // alert(res.message);
  
          this.apiService.fetchAllCountries().subscribe((res) => {
            this.countries = res;
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
      this.countries = res;
      // console.log(res);
    });
  }

  reset() : void {
    this.bookForm.reset();

    this.apiService.fetchAllCountries().subscribe((res) => {
      this.countries = res;
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
        this.countries = res;
      });

    });
    
  }

}
