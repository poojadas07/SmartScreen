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
  id: string;
  hide = true;
  hide1 = true;
  hide2 = true;

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
    this.apiService.logout();
  }

  login() : void {
    if (this.loginForm.invalid) {  
      return;  
   }
    else {
        this.apiService.loginUser(this.loginForm.value).subscribe((res) => {
          console.log(res.body);

          if (res.length != 0){
            this.router.navigate(["dashboard"]);
            localStorage.setItem('isLoggedIn', "true");  
            localStorage.setItem('token', res.body._id);
          }
          else {
            this.modalService.openInfoModal("Credentials not found !!");
          }
        });
    }
  }

  signup() : void {
    if(this.signupForm.value.password == this.signupForm.value.confirmPass){
      this.apiService.signupUser(this.signupForm.value).subscribe((res) => {
        console.log(res.body);

        if (res.status == 207){
          this.modalService.openWarningModal(res.body);
        }
        else if (res.status == 200){
          this.apiService.sendEmail(this.signupForm.value).subscribe((res) => {
            console.log(res.body)
          });
          this.modalService.openInfoModal(res.body);
        }
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
