import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { RegionAddComponent } from './region-add/region-add.component';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.css']
})
export class RegionsComponent implements OnInit {

  searchvalue: string;
  regions: any;

  constructor(private apiService: ApiService,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.apiService.fetchAllRegions().subscribe((res) => {
        this.regions = res;
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
    this.dialog.open(RegionAddComponent);
  }

}
