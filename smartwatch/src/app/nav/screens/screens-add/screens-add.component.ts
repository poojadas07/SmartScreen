import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-screens-add',
  templateUrl: './screens-add.component.html',
  styleUrls: ['./screens-add.component.css']
})
export class ScreensAddComponent implements OnInit {

  bookForm: FormGroup;
  dialogTitle: string;
  screen: any;
  departments: any;
  countries: any;
  regions: any;
  locations: any;
  clients: any;
  condition: string;
  condition2: boolean;
  region: any;
  condition1: boolean;
  country: any;
  condition3: any;
  location: any;
  condition4: any;
  client: any;
  department: any;

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<ScreensAddComponent>,
    private modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {
      this.bookForm = this.formBuilder.group({
        name: ['', Validators.required],
        rows: ['', Validators.required],
        columns: ['', Validators.required],
        status: ['', Validators.required],
        department_id: ['', Validators.required],
        client_id: ['', Validators.required],
        location_id: ['', Validators.required],
        region_id: ['', Validators.required],
        country_id: ['', Validators.required],
      })
     }

  ngOnInit(): void {
    this.dialogTitle = this.data.dialogTitle;

    this.apiService.fetchAllCountries().subscribe((res) => {
      this.countries = res.body;
    });

    if (this.dialogTitle == "Edit Screen"){
      this.condition = 'disable';
      this.apiService.fetchScreenById(this.data.dialogText._id).subscribe((res) => {
        this.screen = res.body;
        // console.log(this.region);
        this.bookForm.get('name').setValue(this.screen.name);
        this.bookForm.get('rows').setValue(this.screen.rows);
        this.bookForm.get('columns').setValue(this.screen.columns);
        this.bookForm.get('status').setValue(this.screen.status);
        this.bookForm.get('department_id').setValue(this.screen.department_id);
        this.bookForm.get('client_id').setValue(this.screen.client_id);
        this.bookForm.get('location_id').setValue(this.screen.location_id);
        this.bookForm.get('region_id').setValue(this.screen.region_id);
        this.bookForm.get('country_id').setValue(this.screen.country_id);
        this.bookForm.controls['rows'].disable();
        this.bookForm.controls['columns'].disable();
      });
    }
  }

  addScreen() : any  {

    if (this.dialogTitle == "Edit Screen"){
      this.apiService.updateScreen(this.data.dialogText._id , this.bookForm.value).subscribe((res) => {
          this.dialogRef.close();
          this.modalService.openInfoModal('Screen '+res.body.name+' Edited Successfully !!');
      });
    }
    else {
      this.apiService.addScreen(this.bookForm.value).subscribe(res => {
          this.dialogRef.close();
          this.modalService.openInfoModal('Screen '+res.body.name+' Added Successfully !!');
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

  changeRegion(event: any){

    this.condition2 = !this.condition2;
    
    if(this.region){
      this.apiService.fetchLocationByRegionId(this.region).subscribe((res) => {
        this.locations = res.body;
      });
    }
  }

  changeLocation(event: any){

    this.condition3 = !this.condition3;
    
    if(this.location){
      this.apiService.fetchClientByLocationId(this.location).subscribe((res) => {
        this.clients = res.body;
      });
    }
  }

  changeClient(event: any){

    this.condition4 = !this.condition4;
    
    if(this.client){
      this.apiService.fetchDepartmentByClientId(this.client).subscribe((res) => {
        this.departments = res.body;
      });
    }
  }


}
