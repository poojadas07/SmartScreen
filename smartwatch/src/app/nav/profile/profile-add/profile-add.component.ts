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

  constructor(public formBuilder: FormBuilder,
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

    if (this.dialogTitle == "Edit Name"){
      this.text = 'Enter Name'; 
      this.apiService.fetchUserById(this.data.dialogText._id).subscribe((res) => {
        this.profile = res;
        // console.log(this.country);
        this.bookForm.get('name').setValue(this.profile.name);
      });
    }
    else if (this.dialogTitle == "Edit Email"){
      this.text = 'Enter Email';
      this.apiService.fetchUserById(this.data.dialogText._id).subscribe((res) => {
        this.profile = res;
        // console.log(this.country);
        this.bookForm.get('name').setValue(this.profile.email);
      });
    }
    else if (this.dialogTitle == "Edit Phone"){
      this.text = 'Enter Phone';
      this.apiService.fetchUserById(this.data.dialogText._id).subscribe((res) => {
        this.profile = res;
        // console.log(this.country);
        this.bookForm.get('name').setValue(this.profile.phone);
      });
    }
  }

  update() : any  {

    if (this.dialogTitle == "Edit Name"){
      this.apiService.updateProfile(this.data.dialogText._id , this.bookForm.value).subscribe((res) => {
          this.dialogRef.close();
          this.modalService.openInfoModal('Name '+res.name+' Edited Successfully !!');
      });
    }
    else if (this.dialogTitle == "Edit Email"){
      this.apiService.updateProfile(this.data.dialogText._id , this.bookForm.value).subscribe((res) => {
          this.dialogRef.close();
          this.modalService.openInfoModal('Email '+res.name+' Edited Successfully !!');
      });
    }
    else if (this.dialogTitle == "Edit Phone"){
      this.apiService.updateProfile(this.data.dialogText._id , this.bookForm.value).subscribe((res) => {
          this.dialogRef.close();
          this.modalService.openInfoModal('Phone '+res.name+' Edited Successfully !!');
      });
    }
  }

}
