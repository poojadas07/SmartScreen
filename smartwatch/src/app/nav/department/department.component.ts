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

  deleteRow(){
    console.log('hhh')
  }

  openDialog() {
    this.dialog.open(DepartmentAddComponent);
  }

}
