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
  id: string;

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
    this.id = localStorage.getItem('token');  
    console.log(this.id);

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
      this.apiService.updateProfile(this.id , this.bookForm.value).subscribe((res) => {
          this.dialogRef.close();
          this.modalService.openInfoModal('Username '+res.username+' Updated Successfully !!');
      });
    }
    else if (this.dialogTitle == "Edit Email"){
      this.apiService.updateProfile(this.id , this.bookForm.value).subscribe((res) => {
          this.dialogRef.close();
          this.modalService.openInfoModal(res.body);
      });
    }
    else if (this.dialogTitle == "Edit Phone"){
      this.apiService.updateProfile(this.id , this.bookForm.value).subscribe((res) => {
          this.dialogRef.close();
          this.modalService.openInfoModal(res.body);
      });
    }
  }
}
