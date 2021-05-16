import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-region-add',
  templateUrl: './region-add.component.html',
  styleUrls: ['./region-add.component.css']
})
export class RegionAddComponent implements OnInit {

  region_name: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login() : void {
    if(this.region_name == 'admin'){
     this.router.navigate(["nav"]);
    }else {
      alert("Invalid credentials");
    }
  }

}
