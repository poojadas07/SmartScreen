import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { RegionAddComponent } from './region-add/region-add.component';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.css']
})
export class RegionsComponent implements OnInit {

  bookForm: FormGroup;
  regions: any;
  collapsed: boolean;

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
    this.router.navigate(["/nav/countries"]);
  }

  add(): void {
    this.openDialog(false);
  }

  info(): void{
    this.router.navigate(["nav/info"], { state: { data: 1 } });
  }


  openDialog(isEdit: boolean, value = null): void {
    let dialogRef;
    if (isEdit == false){
      // console.log(isEdit);
      dialogRef = this.dialog.open(RegionAddComponent , {
        data: {dialogTitle: "Add Region"}
      });
    }

    dialogRef.afterClosed().subscribe(res => {
      // console.log('The dialog was closed');

      this.apiService.fetchAllRegions().subscribe((res) => {
        this.regions = res;
      });

    });
    
  }

  more(): void {
    this.collapsed = !this.collapsed;
  }

}
