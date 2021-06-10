import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ApiService } from 'src/app/service/api.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';

export interface ScreenData {
  sort: number;
  id: string;
  country: string;
  region: string;
  location: string;
  client: string;
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
  
  displayedColumns: string[] = ['sort' , 'id', 'country', 'region', 'location', 'client', 'department', 'screen', 'installed', 'breakdown', 'lifespan', 'status'];

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
    private apiService: ApiService,
    private flashMessages: FlashMessagesService,) {
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
      console.log(this.dataSource);
      this.screens = res;
    });

    // this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  
  }
 
   setfilter(value): void{
     alert(value);
   }

   setarea(value): void{
     alert(value);
   }

   search() : any {
    
    this.apiService.fetchScreenByName(this.bookForm.value).subscribe((res) => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res);
      this.screens = res;
    });
  }

  reset() : void {
    this.bookForm.reset();
    this.apiService.fetchAllScreens().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      console.log(this.dataSource);
      this.screens = res;
    });
  }
  
  screenByName(val): void{

    const value = { searchvalue: val}
    this.apiService.fetchScreenByName(value).subscribe((res) => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res);
      this.screens = res;
    });
  }
  generatePDF(action = 'open') {
    let docDefinition = {
      content: [
        {
          text: 'Screen Report',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            style: 'tableStyle',
            widths: ['auto', 'auto', 'auto', 'auto','auto', 'auto', 'auto', 'auto', 100],
            body: [
              ['SI', 'ID', 'Country', 'Region','Location', 'Client', 'Department' ,'Screen', 'Installed'],
              ...this.screens.map(s => (['1', '1',  s.country.name, s.region.name, s.location.name, s.client.name, s.department.name, s.name, s.createdAt ]))
            ]
          }
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          alignment: 'center',
          color: '#047886',
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]          
        },
        tableStyle: {
          color: '#047886',
        }
      }
    };

    if(action==='download'){
      pdfMake.createPdf(docDefinition).download();
    }else if(action === 'print'){
      pdfMake.createPdf(docDefinition).print();      
    }else{
      pdfMake.createPdf(docDefinition).open();      
    }

  }

  sendMail() {
    const name = "Pooja";
    const email = "poojadas04kv@gmail.com";
    const message = "Hii Friends!!";
    this.apiService.sendEmail(email).subscribe((res) => {
      console.log(res)
    });
  }

}
