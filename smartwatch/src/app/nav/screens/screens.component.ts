import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { ScreensAddComponent } from './screens-add/screens-add.component';

@Component({
  selector: 'app-screens',
  templateUrl: './screens.component.html',
  styleUrls: ['./screens.component.css']
})
export class ScreensComponent implements OnInit {

  screens: any;
  searchvalue: string;

  constructor(private apiService: ApiService,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.apiService.fetchAllCountries().subscribe((res) => {
        this.screens = res;
    });
  }

  search(searchvalue) : void {
    alert(searchvalue)
  }

  editRow(){
    console.log('hhh')
  }

  deleteRow(){
    console.log('hhh')
  }

  openDialog() {
    this.dialog.open(ScreensAddComponent);
  }

}
