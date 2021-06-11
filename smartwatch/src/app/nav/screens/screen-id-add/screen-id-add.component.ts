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
  panels: any;

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
        sensorId: ['', Validators.required],
      })
     }

  ngOnInit(): void {
    this.dialogTitle = this.data.dialogTitle;

    if (this.dialogTitle == "Add Screen Id"){
      this.apiService.fetchPanelById(this.data.dialogText._id).subscribe((res) => {
        this.panels = res;
        console.log(this.panels);
        this.bookForm.get('name').setValue(this.panels.name);
        this.bookForm.get('rows').setValue(this.panels.row_no);
        this.bookForm.get('columns').setValue(this.panels.column_no);
      });
    }
  }

  addScreenId() : any  {

    this.apiService.pairPanelWithSensor(this.data.dialogText._id , this.bookForm.value).subscribe((res) => {
        this.dialogRef.close();
        this.modalService.openInfoModal('Sensor ID '+res.sensor_id+' Added Successfully !!');
    });
  }

}
