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

  editRow(){
    console.log('hhh')
  }

  deleteRow(){
    console.log('hhh')
  }

  openDialog() {
    this.dialog.open(LocationAddComponent);
  }

}
