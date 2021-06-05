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
      this.countries = res;
    });
    
    this.apiService.fetchAllRegions().subscribe((res) => {
      this.regions = res;
    });

    this.apiService.fetchAllLocations().subscribe((res) => {
      this.locations = res;
    });
    
    this.apiService.fetchAllClients().subscribe((res) => {
      this.clients = res;
    });
    
    this.apiService.fetchAllDepartments().subscribe((res) => {
      this.departments = res;
    });

    if (this.dialogTitle == "Edit Screen"){
      this.apiService.fetchScreenById(this.data.dialogText._id).subscribe((res) => {
        this.screen = res;
        // console.log(this.region);
        this.bookForm.get('name').setValue(this.screen.name);
        this.bookForm.get('rows').setValue(this.screen.row);
        this.bookForm.get('columns').setValue(this.screen.column);
        this.bookForm.get('deptName').setValue(this.screen.department.name);
        this.bookForm.get('clientName').setValue(this.screen.department.client.name);
        this.bookForm.get('locationName').setValue(this.screen.department.client.location.name);
        this.bookForm.get('regionName').setValue(this.screen.department.client.location.region.name);
        this.bookForm.get('countryName').setValue(this.screen.department.client.location.region.country.name);
      });
    }
  }

  addScreen() : any  {

    if (this.dialogTitle == "Edit Screen"){
      this.apiService.updateScreen(this.data.dialogText._id , this.bookForm.value).subscribe((res) => {
          this.dialogRef.close();
          this.modalService.openInfoModal('Screen '+res.name+' Edited Successfully !!');
      });
    }
    else {
      this.apiService.addScreen(this.bookForm.value).subscribe(res => {
        // if(res.status == 200){
          this.dialogRef.close();
          this.modalService.openInfoModal('Screen '+res.name+' Added Successfully !!');
  
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
