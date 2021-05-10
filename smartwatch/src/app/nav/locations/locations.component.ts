import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  searchvalue: string;
  locations: any;

  constructor(private apiService: ApiService) { }

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

}
