import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/service/api.service';

export interface ScreenData {
  sort: number;
  id: string;
  screen: string;
  installed: any;
  breakdown: any;
  lifespan: any;
  status: string;
}

const ELEMENT_DATA: ScreenData[] = [
  {sort: 1, id: 'SS-01', screen: 'Screen - 1', installed: '2021-05-29T13:16:44.980Z', breakdown: '2021-06-29T13:16:44.980Z', lifespan: '11m 12d 5h', status: 'Active'},
  {sort: 2, id: 'SS-02', screen: 'Screen - 2', installed: '2021-05-29T13:16:44.980Z', breakdown: '2021-06-29T13:16:44.980Z', lifespan: '11m 12d 5h', status: 'Faulty'},
  {sort: 3, id: 'SS-03', screen: 'Screen - 3', installed: '2021-05-29T13:16:44.980Z', breakdown: '2021-06-29T13:16:44.980Z', lifespan: '11m 12d 5h', status: 'Active'},
  {sort: 4, id: 'SS-04', screen: 'Screen - 4', installed: '2021-05-29T13:16:44.980Z', breakdown: '2021-06-29T13:16:44.980Z', lifespan: '11m 12d 5h', status: 'Faulty'},
  {sort: 5, id: 'SS-05', screen: 'Screen - 5', installed: '2021-05-29T13:16:44.980Z', breakdown: '2021-06-29T13:16:44.980Z', lifespan: '11m 12d 5h', status: 'Active'},
  {sort: 6, id: 'SS-06', screen: 'Screen - 6', installed: '2021-05-29T13:16:44.980Z', breakdown: '2021-06-29T13:16:44.980Z', lifespan: '11m 12d 5h', status: 'Active'},
  {sort: 7, id: 'SS-07', screen: 'Screen - 7', installed: '2021-05-29T13:16:44.980Z', breakdown: '2021-06-29T13:16:44.980Z', lifespan: '11m 12d 5h', status: 'Faulty'},
  {sort: 8, id: 'SS-08', screen: 'Screen - 8', installed: '2021-05-29T13:16:44.980Z', breakdown: '2021-06-29T13:16:44.980Z', lifespan: '11m 12d 5h', status: 'Active'},
  {sort: 9, id: 'SS-09', screen: 'Screen - 9', installed: '2021-05-29T13:16:44.980Z', breakdown: '2021-06-29T13:16:44.980Z', lifespan: '11m 12d 5h', status: 'Active'},
  {sort: 10, id: 'SS-010', screen: 'Screen - 10', installed: '2021-05-29T13:16:44.980Z', breakdown: '2021-06-29T13:16:44.980Z', lifespan: '11m 12d 5h', status: 'Faulty'},
  {sort: 11, id: 'SS-011', screen: 'Screen - 11', installed: '2021-05-29T13:16:44.980Z', breakdown: '2021-06-29T13:16:44.980Z', lifespan: '11m 12d 5h', status: 'Active'},
  {sort: 12, id: 'SS-012', screen: 'Screen - 12', installed: '2021-05-29T13:16:44.980Z', breakdown: '2021-06-29T13:16:44.980Z', lifespan: '11m 12d 5h', status: 'Faulty'},
  {sort: 13, id: 'SS-013', screen: 'Screen - 13', installed: '2021-05-29T13:16:44.980Z', breakdown: '2021-06-29T13:16:44.980Z', lifespan: '11m 12d 5h', status: 'Active'},
  {sort: 14, id: 'SS-014', screen: 'Screen - 14', installed: '2021-05-29T13:16:44.980Z', breakdown: '2021-06-29T13:16:44.980Z', lifespan: '11m 12d 5h', status: 'Faulty'},
  {sort: 15, id: 'SS-015', screen: 'Screen - 15', installed: '2021-05-29T13:16:44.980Z', breakdown: '2021-06-29T13:16:44.980Z', lifespan: '11m 12d 5h', status: 'Active'},
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  bookForm: FormGroup;
  selectedItem: any;
  setItem: any;

  setfilters = ['All', 'Faulty', 'Active'];
  rows = [5,10,15,20];
  
  displayedColumns: string[] = ['sort' , 'id', 'screen', 'installed', 'breakdown', 'lifespan', 'status'];

  @Input() messagelist: any;
  
  dataSource: MatTableDataSource<ScreenData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  screens: any;
  screenName: any;

  constructor(public formBuilder: FormBuilder,
    private apiService: ApiService) {
    this.bookForm = this.formBuilder.group({
      searchvalue: [''],
    }); 

   }

  ngOnInit(): void {

    this.screenName = this.messagelist.name;

    this.apiService.fetchPanelByScreen(this.messagelist._id).subscribe((res) => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    
  }

  searchentity(value): void{
    alert(value)
   }
 
   setfilter(value): void{
     alert(value);
   }

   search() : any {
    
    this.apiService.fetchScreenByName(this.bookForm.value).subscribe((res) => {
      this.screens = res;
    });
  }
}
