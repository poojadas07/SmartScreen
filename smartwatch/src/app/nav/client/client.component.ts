import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { ClientAddComponent } from './client-add/client-add.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients: any;
  searchvalue: string;

  constructor(private apiService: ApiService,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.apiService.fetchAllCountries().subscribe((res) => {
        this.clients = res;
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

  openDialog() {
    this.dialog.open(ClientAddComponent);
  }

}
