import { Component, OnInit } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-screens-add',
  templateUrl: './screens-add.component.html',
  styleUrls: ['./screens-add.component.css']
})
export class ScreensAddComponent implements OnInit {

  screen_name: string;
  rows: number;
  columns: number;
  
  constructor(private router: Router,
    private apiService: ApiService,public dialogRef: MatDialogRef<ScreensAddComponent>) { }

  ngOnInit(): void {
  }

  addScreen() : void {

    this.apiService.addScreen(this.screen_name).subscribe(res => {
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
