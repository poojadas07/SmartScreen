import { Component, OnInit , EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import {MatDialog} from '@angular/material/dialog';
import { CountryAddComponent } from './country-add/country-add.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  bookForm: FormGroup;
  countries: any;

  constructor(public formBuilder: FormBuilder,private apiService: ApiService,
    public dialog: MatDialog,
    private router: Router ,) 
    {
      this.bookForm = this.formBuilder.group({
        searchvalue: [''],
      })
     }

  ngOnInit() {
  }

  add(): void {
    this.openDialog(false);
  }

  info(): void{
    this.router.navigate(["nav/info"]);
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
