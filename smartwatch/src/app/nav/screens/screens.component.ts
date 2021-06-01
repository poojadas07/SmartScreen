import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ScreensAddComponent } from './screens-add/screens-add.component';

@Component({
  selector: 'app-screens',
  templateUrl: './screens.component.html',
  styleUrls: ['./screens.component.css']
})
export class ScreensComponent implements OnInit {

  bookForm: FormGroup;
  screens: any;

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

  back(): void {
    this.router.navigate(["nav/departments"]);
  }

  add(): void {
    this.openDialog(false);
  }

  info(): void{
    this.router.navigate(["nav/info"], { state: { data: 5 } });
  }


  openDialog(isEdit: boolean, value = null): void {
    let dialogRef;
    if (isEdit == false){
      // console.log(isEdit);
      dialogRef = this.dialog.open(ScreensAddComponent , {
        data: {dialogTitle: "Add Screen"}
      });
    }

    dialogRef.afterClosed().subscribe(res => {
      // console.log('The dialog was closed');

      this.apiService.fetchAllDepartments().subscribe((res) => {
        this.screens = res;
      });

    });
    
  }
}
