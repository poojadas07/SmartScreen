import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.css']
})
export class LocationAddComponent implements OnInit {

  location_name: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login() : void {
    if(this.location_name == 'admin'){
     this.router.navigate(["nav"]);
    }else {
      alert("Invalid credentials");
    }
  }

}
