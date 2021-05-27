import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.css']
})
export class LocationAddComponent implements OnInit {

  location_name: string;

  constructor(private router: Router,
    private apiService: ApiService,public dialogRef: MatDialogRef<LocationAddComponent>) { }

  ngOnInit(): void {
  }

  addLocation() : void {
    
    this.apiService.addLocation(this.location_name).subscribe(res => {
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
