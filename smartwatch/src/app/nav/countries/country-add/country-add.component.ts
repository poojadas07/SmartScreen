import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-country-add',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.css']
})
export class CountryAddComponent implements OnInit {

  country_name: string;
  bookForm: FormGroup;

  constructor(public formBuilder: FormBuilder,private router: Router,
    private apiService: ApiService,public dialogRef: MatDialogRef<CountryAddComponent>,
    private modalService: ModalService) 
    {
      this.bookForm = this.formBuilder.group({
        name: [''],
      })
     }

  ngOnInit(): void {
  }

  addCountry() : any  {
    
    this.apiService.addCountry(this.bookForm.value).subscribe(res => {
      console.log(res.status);
      if(res.status == 200){
        this.dialogRef.close();
        // console.log(res.message)
        this.modalService.openInfoModal('Country Added Successfully !!');

        console.log('200');
        // alert(res.message);
      }
      else{
        this.dialogRef.close();

        this.modalService.openInfoModal(res.message);

        console.log('error');
        // alert(res.message);
      }
    })
  }

}
