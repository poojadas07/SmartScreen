import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { LocationAddComponent } from './location-add/location-add.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  bookForm: FormGroup;
  locations: any;
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
    this.router.navigate(["dashboard/regions"]);
  }

  add(): void {
    this.openDialog(false);
  }

  info(): void{
    this.router.navigate(["dashboard/info"], { state: { data: 2 } });
  }


  openDialog(isEdit: boolean, value = null): void {
    let dialogRef;
    if (isEdit == false){
      // console.log(isEdit);
      dialogRef = this.dialog.open(LocationAddComponent , {
        data: {dialogTitle: "Add Location"}
      });
    }

    dialogRef.afterClosed().subscribe(res => {
      // console.log('The dialog was closed');

      this.apiService.fetchAllLocations().subscribe((res) => {
        this.locations = res;
      });

    });
    
  }

  more(): void {
    this.collapsed = !this.collapsed;
  }


}
