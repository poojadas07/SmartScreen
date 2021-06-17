import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CountryAddComponent } from 'src/app/nav/countries/country-add/country-add.component';
import { ApiService } from 'src/app/service/api.service';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  bookForm: any;
  dialogTitle: any;
  country: any;
  
  constructor(public formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<CountryAddComponent>,
    private modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {
      this.bookForm = this.formBuilder.group({
        email: [''],
      })
     }

  ngOnInit(): void {
    this.dialogTitle = this.data.dialogTitle;
  }

  forgotPass() : any  {

    this.apiService.forgotPassword(this.bookForm.value).subscribe((res) => {
      this.dialogRef.close();
      this.modalService.openInfoModal("Your password is sent to your registered email !!");        
    });
  }

}
