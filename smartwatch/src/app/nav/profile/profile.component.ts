import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/service/api.service';
import { FileUploadService } from 'src/app/service/file-upload.service';
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
  profile = 
  [
    {
      name: 'Pooja Das',
      email: 'poojadas04kv@gmail.com',
      phone: '+91-6370677192'
    }
  ];

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];
  userId: string;
  constructor(public formBuilder: FormBuilder,
              private fileUploadService: FileUploadService,
              private apiService: ApiService,
              public dialog: MatDialog,){
      this.bookForm = this.formBuilder.group({
        old: [''],
        new: [''],
        confirm: [''],
      });

      this.myForm = this.formBuilder.group({
        img: [null],
        filename: ['']
      });
     }
  
  ngOnInit(): void {

    this.userId = "";

    this.apiService.fetchUserById(this.userId).subscribe((res) => {
      this.profile = res;
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
    this.apiService.updateProfile(this.userId, this.bookForm.value).subscribe((res) => {
      this.profile = res;
    });
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
    }
    else if (isEdit == 2){
      // console.log(isEdit);
      dialogRef = this.dialog.open(ProfileAddComponent ,{
        data: {dialogTitle: "Edit Email" , dialogText: value}
      });
    }
    else if (isEdit == 3){
      // console.log(isEdit);
      dialogRef = this.dialog.open(ProfileAddComponent ,{
        data: {dialogTitle: "Edit Phone" , dialogText: value}
      });
    }

    dialogRef.afterClosed().subscribe(res => {
      // console.log('The dialog was closed');

    });
    
  }
}
