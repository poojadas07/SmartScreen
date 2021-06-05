import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-region-add',
  templateUrl: './region-add.component.html',
  styleUrls: ['./region-add.component.css']
})
export class RegionAddComponent implements OnInit {

  bookForm: FormGroup;
  dialogTitle: string;
  region: any;
  countries: any;

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<RegionAddComponent>,
    private modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {
      this.bookForm = this.formBuilder.group({
        name: ['', Validators.required],
        country_id: ['', Validators.required],
      })
     }

  ngOnInit(): void {
    this.dialogTitle = this.data.dialogTitle;

    this.apiService.fetchAllCountries().subscribe((res) => {
      this.countries = res;
    });

    if (this.dialogTitle == "Edit Region"){
      this.apiService.fetchRegionById(this.data.dialogText._id).subscribe((res) => {
        this.region = res;
        // console.log(this.region);
        this.bookForm.get('name').setValue(this.region.name);
      });
    }
  }

  addRegion() : any  {

    if (this.dialogTitle == "Edit Region"){
      this.apiService.updateRegion(this.data.dialogText._id , this.bookForm.value).subscribe((res) => {
          this.dialogRef.close();
          this.modalService.openInfoModal('Region '+res.name+' Edited Successfully !!');
      });
    }
    else {
      this.apiService.addRegion(this.bookForm.value).subscribe(res => {
        // if(res.status == 200){
          this.dialogRef.close();
          this.modalService.openInfoModal('Region '+res.name+' Added Successfully !!');
  
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
