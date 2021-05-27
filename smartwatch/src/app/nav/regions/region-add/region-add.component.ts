import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-region-add',
  templateUrl: './region-add.component.html',
  styleUrls: ['./region-add.component.css']
})
export class RegionAddComponent implements OnInit {

  region_name: string;

  constructor(private router: Router,
    private apiService: ApiService,public dialogRef: MatDialogRef<RegionAddComponent>) { }

  ngOnInit(): void {
  }

  addRegion() : void {
    
    this.apiService.addRegion(this.region_name).subscribe(res => {
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
