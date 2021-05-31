import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-country-add',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.css']
})
export class CountryAddComponent implements OnInit {

  bookForm: FormGroup;
  dialogTitle: string;
  country: any;

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<CountryAddComponent>,
    private modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {
      this.bookForm = this.formBuilder.group({
        name: [''],
      })
     }

  ngOnInit(): void {
    this.dialogTitle = this.data.dialogTitle;

    if (this.dialogTitle == "Edit Country"){
      this.apiService.fetchCountryById(this.data.dialogText._id).subscribe((res) => {
        this.country = res;
        // console.log(this.country);
        this.bookForm.get('name').setValue(this.country.name);
      });
    }
  }

  addCountry() : any  {

    if (this.dialogTitle == "Edit Country"){
      this.apiService.updateCountry(this.data.dialogText._id , this.bookForm.value).subscribe((res) => {
          this.dialogRef.close();
          this.modalService.openInfoModal('Country '+res.name+' Edited Successfully !!');
      });
    }
    else {
      this.apiService.addCountry(this.bookForm.value).subscribe(res => {
        // if(res.status == 200){
          this.dialogRef.close();
          this.modalService.openInfoModal('Country '+res.name+' Added Successfully !!');
  
          // console.log('200');
          // alert(res.message);
        // }
        // else{
        //   this.dialogRef.close();
  
        //   this.modalService.openInfoModal(res.message);
  
        //   console.log('error');
        //   // alert(res.message);
        // }
      });
    }
    
  }

}
