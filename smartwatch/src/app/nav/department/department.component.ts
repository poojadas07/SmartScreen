import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { DepartmentAddComponent } from './department-add/department-add.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  bookForm: FormGroup;
  departments: any;

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
    this.router.navigate(["nav/info"], { state: { data: 4 } });
  }


  openDialog(isEdit: boolean, value = null): void {
    let dialogRef;
    if (isEdit == false){
      // console.log(isEdit);
      dialogRef = this.dialog.open(DepartmentAddComponent , {
        data: {dialogTitle: "Add Department"}
      });
    }

    dialogRef.afterClosed().subscribe(res => {
      // console.log('The dialog was closed');

      this.apiService.fetchAllDepartments().subscribe((res) => {
        this.departments = res;
      });

    });
    
  }

}
