import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.css']
})
export class RegionsComponent implements OnInit {

  searchvalue: string;
  regions: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {

    this.apiService.fetchAllRegions().subscribe((res) => {
        this.regions = res;
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

}
