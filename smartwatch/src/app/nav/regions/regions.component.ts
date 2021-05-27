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

  deleteRow(region){
    // console.log('hhh')

    this.apiService.deleteRegion(region._id).subscribe((res) => {
      alert(res.message);

      this.apiService.fetchAllRegions().subscribe((res) => {
        this.regions = res;
      });

    });

  }

  openDialog() {
    const dialogRef = this.dialog.open(RegionAddComponent);

    dialogRef.afterClosed().subscribe(res => {
      console.log('The dialog was closed');

      this.apiService.fetchAllRegions().subscribe((res) => {
        this.regions = res;
      });

    });
  }

}
