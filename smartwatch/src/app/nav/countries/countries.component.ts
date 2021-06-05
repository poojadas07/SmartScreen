import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import {MatDialog} from '@angular/material/dialog';
import { CountryAddComponent } from './country-add/country-add.component';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'More',
    children: [
      {
        name: 'India',
        children: [
          {
            name: 'Jodhpur',
            children: [
              {
                name: 'Villa' , 
                children: [
                  {
                    name: 'Tata Manager',
                    children: [
                      {
                        name: 'Adminstration',
                        children: [
                          {name: 'Screen A'},
                          {name: 'Screen B'},
                          {name: 'Screen C'},
                        ]
                      },
                      {name: 'India'},
                    ]
                  },
                  {name: 'India'},
                ]
              },
              {name: 'India'},
            ]
        },
          {name: 'India'},
        ]
      }, {
        name: 'India',
        children: [
          {name: 'USA'},
          {name: 'India'},
        ]
      },
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  bookForm: FormGroup;
  countries: any;
  collapsed: boolean;
  showFirst: boolean;
  showFirst1: boolean;

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeControl1 = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);
  
  treeControl2 = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  dataSource1 = new MatTreeFlatDataSource(this.treeControl1, this.treeFlattener);

  dataSource2 = new MatTreeFlatDataSource(this.treeControl2, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(public formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog,
    private router: Router ,
    private breakpointObserver: BreakpointObserver,) 
    {
      this.bookForm = this.formBuilder.group({
        searchvalue: [''],
      })
      this.dataSource.data = TREE_DATA;
      this.dataSource1.data = TREE_DATA;
      this.dataSource2.data = TREE_DATA;
     }

  ngOnInit() {
  }

  add(): void {
    this.openDialog(false);
  }

  info(): void{
    this.router.navigate(["dashboard/info"], { state: { data: 0 } });
  }


  openDialog(isEdit: boolean, value = null): void {
    let dialogRef;
    if (isEdit == false){
      // console.log(isEdit);
      dialogRef = this.dialog.open(CountryAddComponent , {
        data: {dialogTitle: "Add Country"}
      });
    }

    dialogRef.afterClosed().subscribe(res => {
      // console.log('The dialog was closed');

      this.apiService.fetchAllCountries().subscribe((res) => {
        this.countries = res;
      });

    });
    
  }

  more(): void {
    this.collapsed = !this.collapsed;
  }

}
