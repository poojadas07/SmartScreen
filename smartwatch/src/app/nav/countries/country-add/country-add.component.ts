import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-add',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.css']
})
export class CountryAddComponent implements OnInit {

  country_name: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login() : void {
    if(this.country_name == 'admin'){
     this.router.navigate(["nav"]);
    }else {
      alert("Invalid credentials");
    }
  }

}
