import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ModalService } from '../service/modal.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loginForm: FormGroup;
  signupForm: FormGroup;

  constructor(private router: Router,
    public formBuilder: FormBuilder,
    private apiService: ApiService,
    private modalService: ModalService,
    public dialog: MatDialog,) 
    {
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      });

      this.signupForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPass: ['', Validators.required],
      });
     }

  ngOnInit(): void {
  }

  login() : void {
    this.apiService.loginUser(this.loginForm.value).subscribe((res) => {
      console.log(res);

      if (res.length != 0){
        this.router.navigate(["dashboard"]);
      }
      else {
        this.modalService.openInfoModal("Credentials not found !!");
      }
    });
  }

  signup() : void {
    if(this.signupForm.value.password == this.signupForm.value.confirmPass){
      this.apiService.signupUser(this.signupForm.value).subscribe((res) => {
        console.log(res);
      });
      this.apiService.sendEmail(this.signupForm.value).subscribe((res) => {
        console.log(res)
      });
    }
    else {
      this.modalService.openInfoModal("Password is not equal !!");
    }
  }
  
  loginWithGoogle(): void {

  }

  forgot(): void {
    this.openDialog(false);
  }

  openDialog(isEdit: boolean, value = null): void {
    let dialogRef;
    if (isEdit == false){
      // console.log(isEdit);
      dialogRef = this.dialog.open(ForgotPasswordComponent , {
        data: {dialogTitle: "Forgot Password"}
      });
    }

    dialogRef.afterClosed().subscribe(res => {
      // console.log('The dialog was closed');

    });
    
  }

}
