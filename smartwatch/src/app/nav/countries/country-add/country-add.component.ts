import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-country-add',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.css']
})
export class CountryAddComponent implements OnInit {

  country_name: string;

  constructor(private router: Router,
    private apiService: ApiService,) { }

  ngOnInit(): void {
  }

  addCountry() : void {
    
    this.apiService.addCountry(this.country_name).subscribe(res => {
      if(res.status == 200){
        console.log('200');
        alert(res.message);
      }
      else{
        console.log('hello');
        alert(res.message);
      }
    })
  }

}
