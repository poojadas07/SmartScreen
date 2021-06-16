import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/service/api.service';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { ModalService } from 'src/app/service/modal.service';
import { ProfileAddComponent } from './profile-add/profile-add.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  bookForm: FormGroup;
  collapsed: boolean;
  filePath = 'https://www.w3schools.com/w3images/avatar_hat.jpg';
  myForm: FormGroup;
  file: File = null;
  selectedFiles: any;
  name: any;
  email: any;
  phone: any;

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];
  userId: string;
  profile: any;
  password: any;
  constructor(public formBuilder: FormBuilder,
              private fileUploadService: FileUploadService,
              private apiService: ApiService,
              public dialog: MatDialog,
              private modalService: ModalService,){
      this.bookForm = this.formBuilder.group({
        old: [''],
        password: [''],
        confirm: [''],
      });

      this.myForm = this.formBuilder.group({
        img: [null],
        filename: ['']
      });
     }
  
  ngOnInit(): void {

    this.userId = "";

    this.apiService.fetchUserById('60c21a0d0a7f573538b27002').subscribe((res) => {
      this.name = res.username;
      this.email = res.email;
      this.phone = res.phone;

      this.bookForm.get('old').setValue(res.password);
      console.log(res)
    });
    
  }

  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];

    this.myForm.patchValue({
      img: file
    });

    this.myForm.get('img').updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  onClick() {  
    const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {  
      for (let index = 0; index < fileUpload.files.length; index++)  
      {  
        const file = fileUpload.files[index];  
        this.files.push({ data: file, inProgress: false, progress: 0});  
      }  
        this.uploadFiles();  
      };  
    fileUpload.click();  
  }

  uploadFiles() {  
      this.fileUpload.nativeElement.value = '';  
      this.files.forEach(file => {  
        this.uploadFile(file);  
      });  
  }

  uploadFile(file) {  
    const formData = new FormData();  
    formData.append('file', file.data);  
    file.inProgress = true; 
    this.fileUploadService.upload(formData).pipe(  
      map(event => {  
        switch (event.type) {  
          case HttpEventType.UploadProgress:  
            file.progress = Math.round(event.loaded * 100 / event.total);  
            break;  
          case HttpEventType.Response:  
            return event;  
        }  
      }),  
      catchError((error: HttpErrorResponse) => {  
        file.inProgress = false;  
        return of(`${file.data.name} upload failed.`);  
      })).subscribe((event: any) => {  
        if (typeof (event) === 'object') {  
          console.log(event.body);  
        }  
      });  
  }

  more(): void {
    this.collapsed = !this.collapsed;
  }

  changePass(): void{
    this.userId = "";
    if (this.bookForm.value.confirm == this.bookForm.value.password){
      this.apiService.changePassword('60c21a0d0a7f573538b27002', this.bookForm.value).subscribe((res) => {
        this.profile = res;
        this.collapsed = !this.collapsed;
        this.modalService.openInfoModal("Password set successfully !!");
      });
    }
    else{
      this.modalService.openInfoModal("Password not same !!");
    }
  }

  cancel(): void{
    this.collapsed = !this.collapsed;
  }

  editName(item): void{
    this.openDialog(1 , item);
  }

  editEmail(item): void{
    this.openDialog(2 , item);
  }

  editPhone(item): void{
    this.openDialog(3 , item);
  }

  openDialog(isEdit: number, value = null): void {
    let dialogRef;

    if (isEdit == 1){
        // console.log(isEdit);
        dialogRef = this.dialog.open(ProfileAddComponent , {
          data: {dialogTitle: "Edit Name" , dialogText: value}
        });

        dialogRef.afterClosed().subscribe(res => {
          this.apiService.fetchUserById('60c21a0d0a7f573538b27002').subscribe((res) => {
            this.name = res.username;
          });
        });
        
    }
    else if (isEdit == 2){
      // console.log(isEdit);
      dialogRef = this.dialog.open(ProfileAddComponent ,{
        data: {dialogTitle: "Edit Email" , dialogText: value}
      });

      dialogRef.afterClosed().subscribe(res => {
        this.apiService.fetchUserById('60c21a0d0a7f573538b27002').subscribe((res) => {
          this.email = res.email;
        });
      });
      
    }
    else if (isEdit == 3){
      // console.log(isEdit);
      dialogRef = this.dialog.open(ProfileAddComponent ,{
        data: {dialogTitle: "Edit Phone" , dialogText: value}
      });

      dialogRef.afterClosed().subscribe(res => {
        this.apiService.fetchUserById('60c21a0d0a7f573538b27002').subscribe((res) => {
          this.phone = res.phone;
        });
      });
      
    }
    
  }
}
