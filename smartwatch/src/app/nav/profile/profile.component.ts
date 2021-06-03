import { Component, OnInit } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  bookForm: FormGroup;
  collapsed: boolean;

  constructor(public formBuilder: FormBuilder,){
      this.bookForm = this.formBuilder.group({
        old: [''],
        new: [''],
        confirm: [''],
      })
     }
  
  ngOnInit(): void {
  }

  more(): void {
    this.collapsed = !this.collapsed;
  }

  addCountry(): void{

  }
}
