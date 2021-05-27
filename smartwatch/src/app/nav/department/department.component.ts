import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { DepartmentAddComponent } from './department-add/department-add.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  departments: any;
  searchvalue: string;

  constructor(private apiService: ApiService,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.apiService.fetchAllCountries().subscribe((res) => {
        this.departments = res;
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

  deleteRow(department){
    // console.log('hhh');

    this.apiService.deleteDepartment(department._id).subscribe((res) => {
      alert(res.message);

      this.apiService.fetchAllDepartments().subscribe((res) => {
        this.departments = res;
      });

    });

  }

  openDialog() {
    const dialogRef = this.dialog.open(DepartmentAddComponent);

    dialogRef.afterClosed().subscribe(res => {
      console.log('The dialog was closed');

      this.apiService.fetchAllDepartments().subscribe((res) => {
        this.departments = res;
      });

    });

  }

}
