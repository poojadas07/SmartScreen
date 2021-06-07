import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/service/api.service';

export interface ScreenData {
  sort: number;
  id: string;
  country: string;
  region: string;
  location: string;
  department: string;
  screen: string;
  installed: any;
  breakdown: any;
  lifespan: any;
  status: string;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements AfterViewInit {

  bookForm: FormGroup;
  selectedItem: any;
  setItem: any;
  setArea: any;

  setfilters = ['All', 'Faulty', 'Active'];
  setareas = ['Country', 'Region', 'Location', 'Deptment', 'Screen'];
  rows = [5,10,15,20];
  
  displayedColumns: string[] = ['sort' , 'id', 'country', 'region', 'location', 'department', 'screen', 'installed', 'breakdown', 'lifespan', 'status'];

  @Input() messagelist: any[];
  
  dataSource: MatTableDataSource<ScreenData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  screens: any;
  countries: any;
  regions: any;
  locations: any;
  departments: any;
  screens1: any;
  clients: any;
  areas: any;

  constructor(public formBuilder: FormBuilder,
    private apiService: ApiService) {
    this.bookForm = this.formBuilder.group({
      searchvalue: [''],
    }); 

   }

  ngAfterViewInit(): void {

    this.apiService.fetchPoPCountry().subscribe((res) => {
      this.areas = res;
      console.log(this.areas);
    });

    this.apiService.fetchAllScreens().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
    });

    // this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  
  }
    
    
  searchentity(value): void{
    alert(value)
   }
 
   setfilter(value): void{
     alert(value);
   }

   setarea(value): void{
     alert(value);
   }

   search() : any {
    
    this.apiService.fetchScreenByName(this.bookForm.value).subscribe((res) => {
      this.screens = res;
    });
  }
  

}
