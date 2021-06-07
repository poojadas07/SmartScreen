import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { ModalService } from 'src/app/service/modal.service';
import { CountryAddComponent } from '../../countries/country-add/country-add.component';

@Component({
  selector: 'app-screen-id-add',
  templateUrl: './screen-id-add.component.html',
  styleUrls: ['./screen-id-add.component.css']
})
export class ScreenIdAddComponent implements OnInit {

  bookForm: FormGroup;
  dialogTitle: string;
  screen: any;

  constructor(public formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<CountryAddComponent>,
    private modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {
      this.bookForm = this.formBuilder.group({
        name: ['', Validators.required],
        rows: ['', Validators.required],
        columns: ['', Validators.required],
        screenId: ['', Validators.required],
      })
     }

  ngOnInit(): void {
    this.dialogTitle = this.data.dialogTitle;

    if (this.dialogTitle == "Add Screen Id"){
      this.apiService.fetchScreenById(this.data.dialogText._id).subscribe((res) => {
        this.screen = res;
        console.log(this.screen);
        this.bookForm.get('name').setValue(this.screen.name);
        this.bookForm.get('rows').setValue(this.screen.rows);
        this.bookForm.get('columns').setValue(this.screen.columns);
      });
    }
  }

  addScreenId() : any  {

    this.apiService.updateCountry(this.data.dialogText._id , this.bookForm.value).subscribe((res) => {
        this.dialogRef.close();
        this.modalService.openInfoModal('Screen ID '+res.screenId+' Added Successfully !!');
    });
  }

}
