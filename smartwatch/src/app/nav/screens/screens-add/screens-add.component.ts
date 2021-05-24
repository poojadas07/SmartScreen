import { Component, OnInit } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-screens-add',
  templateUrl: './screens-add.component.html',
  styleUrls: ['./screens-add.component.css']
})
export class ScreensAddComponent implements OnInit {

  screen_name: string;
  rows: number;
  columns: number;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login() : void {
    if(this.screen_name == 'admin'){
     this.router.navigate(["nav"]);
    }else {
      alert("Invalid credentials");
    }
  }

}
