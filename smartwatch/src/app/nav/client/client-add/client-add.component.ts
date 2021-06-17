import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit {

  bookForm: FormGroup;
  dialogTitle: string;
  client: any;
  locations: any;
  regions: any;
  countries: any;
  condition: string;
  country: any;
  condition1: boolean = false;
  condition2: boolean = false;
  region: String;
  location: any;

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<ClientAddComponent>,
    private modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {
      this.bookForm = this.formBuilder.group({
        name: ['', Validators.required],
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

    if (this.dialogTitle == "Edit Client"){
      this.condition = 'disable';
      this.apiService.fetchClientById(this.data.dialogText._id).subscribe((res) => {
        this.client = res.body;
        // console.log(this.client);
        this.bookForm.get('name').setValue(this.client.name);
        this.bookForm.get('location_id').setValue(this.client.location_id);
        this.bookForm.get('region_id').setValue(this.client.region_id);
        this.bookForm.get('country_id').setValue(this.client.country_id);
      });
    }
  }

  addClient() : any  {

    if (this.dialogTitle == "Edit Client"){
      this.apiService.updateClient(this.data.dialogText._id , this.bookForm.value).subscribe((res) => {
          this.dialogRef.close();
          this.modalService.openInfoModal(res.body);
      });
    }
    else {
      this.apiService.addClient(this.bookForm.value).subscribe(res => {
        // if(res.status == 200){
          this.dialogRef.close();
          this.modalService.openInfoModal(res.body);
  
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

  changeCountry(event: any) {
    // console.log(this.client);
    this.condition1 = !this.condition1;
    this.apiService.fetchRegionByCountryId(this.country).subscribe((res) => {
      this.regions = res.body;
    });
    // return this.country;
  }

  changeRegion(event: any){

    this.condition2 = !this.condition2;
    
    this.apiService.fetchLocationByRegionId(this.region).subscribe((res) => {
      this.locations = res.body;
    });
  }


}
