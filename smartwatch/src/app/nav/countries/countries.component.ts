import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import {MatDialog} from '@angular/material/dialog';
import { CountryAddComponent } from './country-add/country-add.component';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries: any;
  searchvalue: string;

  constructor(private apiService: ApiService,
    public dialog: MatDialog,
    private modalService: ModalService) { }

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


  search(searchvalue) : void {
    alert(searchvalue)
  }

  reset() : void {
    this.searchvalue = " ";

    this.apiService.fetchAllCountries().subscribe((res) => {
      this.countries = res;
    });
  }
  
  editRow(){
    console.log('hhh')
  }

  deleteRow(country){
    // console.log('hhh');

    this.openConfirmModal(country);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CountryAddComponent);

    dialogRef.afterClosed().subscribe(res => {
      console.log('The dialog was closed');

      this.apiService.fetchAllCountries().subscribe((res) => {
        this.countries = res;
      });

    });
  }

}
