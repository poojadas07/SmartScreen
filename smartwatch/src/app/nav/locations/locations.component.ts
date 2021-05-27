import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { LocationAddComponent } from './location-add/location-add.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  searchvalue: string;
  locations: any;

  constructor(private apiService: ApiService,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.apiService.fetchAllRegions().subscribe((res) => {
        this.locations = res;
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

  deleteRow(location){
    // console.log('hhh');

    this.apiService.deleteLocation(location._id).subscribe((res) => {
      alert(res.message);

      this.apiService.fetchAllLocations().subscribe((res) => {
        this.locations = res;
      });

    });

  }

  openDialog() {
    const dialogRef = this.dialog.open(LocationAddComponent);

    dialogRef.afterClosed().subscribe(res => {
      console.log('The dialog was closed');

      this.apiService.fetchAllLocations().subscribe((res) => {
        this.locations = res;
      });

    });
  }

}
