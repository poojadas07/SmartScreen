import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ClientAddComponent } from './client-add/client-add.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  bookForm: FormGroup;
  clients: any;
  collapsed: boolean;

  constructor(public formBuilder: FormBuilder,private apiService: ApiService,
    public dialog: MatDialog,
    private router: Router ,) 
    {
      this.bookForm = this.formBuilder.group({
        searchvalue: [''],
      })
     }

  ngOnInit() {
  }

  back(): void {
    this.router.navigate(["nav/locations"]);
  }
  
  add(): void {
    this.openDialog(false);
  }

  info(): void{
    this.router.navigate(["nav/info"], { state: { data: 3 } });
  }


  openDialog(isEdit: boolean, value = null): void {
    let dialogRef;
    if (isEdit == false){
      // console.log(isEdit);
      dialogRef = this.dialog.open(ClientAddComponent , {
        data: {dialogTitle: "Add Client"}
      });
    }

    dialogRef.afterClosed().subscribe(res => {
      // console.log('The dialog was closed');

      this.apiService.fetchAllClients().subscribe((res) => {
        this.clients = res;
      });

    });
    
  }

  more(): void {
    this.collapsed = !this.collapsed;
  }


}
