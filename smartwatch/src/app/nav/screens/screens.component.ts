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

  reset() : void {
    alert('hello');
  }

  editRow(){
    console.log('hhh')
  }

  deleteRow(screen){
    // console.log('hhh');

    this.apiService.deleteScreen(screen._id).subscribe((res) => {
      alert(res.message);

      this.apiService.fetchAllScreens().subscribe((res) => {
        this.screens = res;
      });

    });

  }

  openDialog() {
    const dialogRef = this.dialog.open(ScreensAddComponent);

    dialogRef.afterClosed().subscribe(res => {
      console.log('The dialog was closed');

      this.apiService.fetchAllScreens().subscribe((res) => {
        this.screens = res;
      });

    });

  }

}
