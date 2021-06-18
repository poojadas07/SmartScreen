import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.css']
})
export class DepartmentAddComponent implements OnInit {

  bookForm: FormGroup;
  dialogTitle: string;
  department: any;
  clients: any;
  countries: any;
  regions: any;
  locations: any;
  condition: string;
  country: any;
  condition1: boolean = false;
  condition2: boolean = false;
  condition3: boolean = false;
  region: String;
  location: any;
  client: any;

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<DepartmentAddComponent>,
    private modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {
      this.bookForm = this.formBuilder.group({
        name: ['', Validators.required],
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

    if (this.dialogTitle == "Edit Department"){
      this.condition = 'disable';
      this.apiService.fetchDepartmentById(this.data.dialogText._id).subscribe((res) => {
        this.department = res.body;

        this.bookForm.get('name').setValue(this.department.name);
        this.bookForm.get('client_id').setValue(this.department.client_id);
        this.bookForm.get('location_id').setValue(this.department.location_id);
        this.bookForm.get('region_id').setValue(this.department.region_id);
        this.bookForm.get('country_id').setValue(this.department.country_id);

      });
    }
  }

  addDepartment() : any  {

    if (this.dialogTitle == "Edit Department"){
      this.apiService.updateDepartment(this.data.dialogText._id , this.bookForm.value).subscribe((res) => {
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
      this.apiService.addDepartment(this.bookForm.value).subscribe(res => {
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


}