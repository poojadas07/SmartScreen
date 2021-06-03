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

const ELEMENT_DATA: ScreenData[] = [
  {sort: 1, id: 'SS-01', country: 'India', region: 'East', location: 'Jamshedpur', department: 'Blast Furnance', screen: 'Screen - 1', installed: '2021-05-29 13:16:44', breakdown: '2021-05-29 13:16:44', lifespan: '11m 12d 5h', status: 'Active'},
  {sort: 2, id: 'SS-02', country: 'India', region: 'East', location: 'Jamshedpur', department: 'Blast Furnance', screen: 'Screen - 2', installed: '2021-05-29 13:16:44', breakdown: '2021-05-29 13:16:44', lifespan: '11m 12d 5h', status: 'Faulty'},
  {sort: 3, id: 'SS-03', country: 'India', region: 'East', location: 'Jamshedpur', department: 'Blast Furnance', screen: 'Screen - 3', installed: '2021-05-29 13:16:44', breakdown: '2021-05-29 13:16:44', lifespan: '11m 12d 5h', status: 'Active'},
  {sort: 4, id: 'SS-04', country: 'India', region: 'East', location: 'Jamshedpur', department: 'Blast Furnance', screen: 'Screen - 4', installed: '2021-05-29 13:16:44', breakdown: '2021-05-29 13:16:44', lifespan: '11m 12d 5h', status: 'Faulty'},
  {sort: 5, id: 'SS-05', country: 'India', region: 'East', location: 'Jamshedpur', department: 'Blast Furnance', screen: 'Screen - 5', installed: '2021-05-29 13:16:44', breakdown: '2021-05-29 13:16:44', lifespan: '11m 12d 5h', status: 'Active'},
  {sort: 6, id: 'SS-06', country: 'India', region: 'East', location: 'Jamshedpur', department: 'Blast Furnance', screen: 'Screen - 6', installed: '2021-05-29 13:16:44', breakdown: '2021-05-29 13:16:44', lifespan: '11m 12d 5h', status: 'Active'},
  {sort: 7, id: 'SS-07', country: 'India', region: 'East', location: 'Jamshedpur', department: 'Blast Furnance', screen: 'Screen - 7', installed: '2021-05-29 13:16:44', breakdown: '2021-05-29 13:16:44', lifespan: '11m 12d 5h', status: 'Faulty'},
  {sort: 8, id: 'SS-08', country: 'India', region: 'East', location: 'Jamshedpur', department: 'Blast Furnance', screen: 'Screen - 8', installed: '2021-05-29 13:16:44', breakdown: '2021-05-29 13:16:44', lifespan: '11m 12d 5h', status: 'Active'},
  {sort: 9, id: 'SS-09', country: 'India', region: 'East', location: 'Jamshedpur', department: 'Blast Furnance', screen: 'Screen - 9', installed: '2021-05-29 13:16:44', breakdown: '2021-05-29 13:16:44', lifespan: '11m 12d 5h', status: 'Active'},
  {sort: 10, id: 'SS-010', country: 'India', region: 'East', location: 'Jamshedpur', department: 'Blast Furnance', screen: 'Screen - 10', installed: '2021-05-29 13:16:44', breakdown: '2021-05-29 13:16:44', lifespan: '11m 12d 5h', status: 'Faulty'},
  {sort: 11, id: 'SS-011', country: 'India', region: 'East', location: 'Jamshedpur', department: 'Blast Furnance', screen: 'Screen - 11', installed: '2021-05-29 13:16:44', breakdown: '2021-05-29 13:16:44', lifespan: '11m 12d 5h', status: 'Active'},
  {sort: 12, id: 'SS-012', country: 'India', region: 'East', location: 'Jamshedpur', department: 'Blast Furnance', screen: 'Screen - 12', installed: '2021-05-29 13:16:44', breakdown: '2021-05-29 13:16:44', lifespan: '11m 12d 5h', status: 'Faulty'},
  {sort: 13, id: 'SS-013', country: 'India', region: 'East', location: 'Jamshedpur', department: 'Blast Furnance', screen: 'Screen - 13', installed: '2021-05-29 13:16:44', breakdown: '2021-05-29 13:16:44', lifespan: '11m 12d 5h', status: 'Active'},
  {sort: 14, id: 'SS-014', country: 'India', region: 'East', location: 'Jamshedpur', department: 'Blast Furnance', screen: 'Screen - 14', installed: '2021-05-29 13:16:44', breakdown: '2021-05-29 13:16:44', lifespan: '11m 12d 5h', status: 'Faulty'},
  {sort: 15, id: 'SS-015', country: 'India', region: 'East', location: 'Jamshedpur', department: 'Blast Furnance', screen: 'Screen - 15', installed: '2021-05-29 13:16:44', breakdown: '2021-05-29 13:16:44', lifespan: '11m 12d 5h', status: 'Active'},
];


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

  constructor(public formBuilder: FormBuilder,
    private apiService: ApiService) {
    this.bookForm = this.formBuilder.group({
      searchvalue: [''],
    }); 

   }

  ngAfterViewInit(): void {

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
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
