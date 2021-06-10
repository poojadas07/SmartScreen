import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ModalService } from 'src/app/service/modal.service';
import { CountryAddComponent } from '../../countries/country-add/country-add.component';

@Component({
  selector: 'app-profile-add',
  templateUrl: './profile-add.component.html',
  styleUrls: ['./profile-add.component.css']
})
export class ProfileAddComponent implements OnInit {

  bookForm: FormGroup;
  dialogTitle: string;
  text: any;
  profile: any;
  val: string;

  constructor(public formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<CountryAddComponent>,
    private modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {
      this.bookForm = this.formBuilder.group({
        username: [''],
        email: [''],
        phone: ['']
      })
     }

  ngOnInit(): void {
    this.dialogTitle = this.data.dialogTitle;

    if (this.dialogTitle == "Edit Name"){
      this.text = 'Enter Name'; 
      this.val = 'username';
      this.bookForm.get(this.val).setValue(this.data.dialogText);
    }
    else if (this.dialogTitle == "Edit Email"){
      this.text = 'Enter Email';
      this.val = 'email';
      this.bookForm.get(this.val).setValue(this.data.dialogText);
    }
    else if (this.dialogTitle == "Edit Phone"){
      this.text = 'Enter Phone';
      this.val = 'phone';
      this.bookForm.get(this.val).setValue(this.data.dialogText);
    }
  }

  update() : any  {

    if (this.dialogTitle == "Edit Name"){
      // alert(this.bookForm.value);
      this.apiService.updateProfile('60c21a0d0a7f573538b27002' , this.bookForm.value).subscribe((res) => {
          this.dialogRef.close();
          this.modalService.openInfoModal('Name '+res.username+' Edited Successfully !!');
      });
    }
    else if (this.dialogTitle == "Edit Email"){
      this.apiService.updateProfile('60c21a0d0a7f573538b27002' , this.bookForm.value).subscribe((res) => {
          this.dialogRef.close();
          this.modalService.openInfoModal('Email '+res.email+' Edited Successfully !!');
      });
    }
    else if (this.dialogTitle == "Edit Phone"){
      this.apiService.updateProfile('60c21a0d0a7f573538b27002' , this.bookForm.value).subscribe((res) => {
          this.dialogRef.close();
          this.modalService.openInfoModal('Phone '+res.phone+' Edited Successfully !!');
      });
    }
  }
}
