import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {

  client_name: string;

  constructor(private router: Router,
    private apiService: ApiService,public dialogRef: MatDialogRef<ClientAddComponent>) { }

  ngOnInit(): void {
  }

  addClient() : void {

    this.apiService.addClient(this.client_name).subscribe(res => {
      if(res.status == 200){
        this.dialogRef.close();
        console.log('200');
        alert(res.message);
      }
      else{
        this.dialogRef.close();
        console.log('error');
        alert(res.message);
      }
    })
  }

}
