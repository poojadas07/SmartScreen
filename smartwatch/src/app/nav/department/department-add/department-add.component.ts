import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.css']
})
export class DepartmentAddComponent implements OnInit {

  department_name: string;

  constructor(private router: Router,
    private apiService: ApiService,public dialogRef: MatDialogRef<DepartmentAddComponent>) { }

  ngOnInit(): void {
  }

  addDepartment() : void {

    this.apiService.addDepartment(this.department_name).subscribe(res => {
      if(res.status == 200){
        this.dialogRef.close();
        console.log('200');
        alert(res.message);
      }
      else{
        this.dialogRef.close();
        console.log('error');
        alert(res.message);
      }
    })
  }

}