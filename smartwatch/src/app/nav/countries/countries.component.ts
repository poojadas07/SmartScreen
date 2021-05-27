import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import {MatDialog} from '@angular/material/dialog';
import { CountryAddComponent } from './country-add/country-add.component';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries: any;
  searchvalue: string;

  constructor(private apiService: ApiService,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.apiService.fetchAllCountries().subscribe((res) => {
        this.countries = res;
    });
  }

  search(searchvalue) : void {
    alert(searchvalue)
  }

  reset() : void {
    alert('hello');
  }
  
  editRow(){
    console.log('hhh')
  }

  deleteRow(country){
    // console.log('hhh');

    this.apiService.deleteCountry(country._id).subscribe((res) => {
      alert(res.message);

      this.apiService.fetchAllCountries().subscribe((res) => {
        this.countries = res;
      });

    });
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
