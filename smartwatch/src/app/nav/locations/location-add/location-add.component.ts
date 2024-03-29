import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.css']
})
export class LocationAddComponent implements OnInit {

  bookForm: FormGroup;
  dialogTitle: string;
  location: any;
  regions: any;
  countries: any;
  condition: string;
  country: any;
  condition1: boolean = false;
  region: any;
  countryValue: any;

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<LocationAddComponent>,
    private modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {
      this.bookForm = this.formBuilder.group({
        name: ['', Validators.required],
        region_id: ['', Validators.required],
        country_id: ['', Validators.required],
      })
     }

  ngOnInit(): void {
    this.dialogTitle = this.data.dialogTitle;

    this.apiService.fetchAllCountries().subscribe((res) => {
      this.countries = res.body;
    });

    if (this.dialogTitle == "Edit Location"){
      this.condition = 'disable';
      this.apiService.fetchLocationById(this.data.dialogText._id).subscribe((res) => {
        this.location = res.body;
        
        this.bookForm.get('name').setValue(this.location.name);
        this.bookForm.get('region_id').setValue(this.location.region_id);
        this.bookForm.get('country_id').setValue(this.location.country_id);
        
      });
    }

  }

  addLocation() : any  {

    if (this.dialogTitle == "Edit Location"){
      this.apiService.updateLocation(this.data.dialogText._id , this.bookForm.value).subscribe((res) => {
          this.dialogRef.close();
          if (res.status == 207){
            this.modalService.openWarningModal(res.body);
          }
          else if (res.status == 200){
            this.modalService.openInfoModal(res.body);
          }
      });
    }
    else {
      this.apiService.addLocation(this.bookForm.value).subscribe(res => {
          this.dialogRef.close();
          if (res.status == 207){
            this.modalService.openWarningModal(res.body);
          }
          else if (res.status == 200){
            this.modalService.openInfoModal(res.body);
          }
      });
    }
    
  }

  changeCountry(event: any) {
    this.condition1 = !this.condition1;
    
    if(this.country){
      this.apiService.fetchRegionByCountryId(this.country).subscribe((res) => {
        this.regions = res.body;
      });
    }
  }

}
