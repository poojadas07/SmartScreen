import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ApiService } from 'src/app/service/api.service';
import { DepartmentAddComponent } from './department-add/department-add.component';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  bookForm: FormGroup;
  departments: any;
  collapsed: boolean;

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
  departmentSize: any;
  areas: any;
  screenSize: any;
  activescreenSize: any;

  constructor(public formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog,
    private router: Router ,
    private breakpointObserver: BreakpointObserver,) 
    {
      this.bookForm = this.formBuilder.group({
        searchvalue: [''],
      });
     }

  ngOnInit() {

    this.apiService.fetchAllDepartments().subscribe((res) => {
      this.departmentSize = res.length;
    });

    this.apiService.fetchAllScreens().subscribe((res) => {
      this.screenSize = res.length;
    });

    this.apiService.fetchAllActiveScreens().subscribe((res) => {
      this.activescreenSize = res.length;
    });

    this.apiService.fetchPoPCountry().subscribe((res) => {
      this.areas = res;
      const TREE_DATA = [
        {
          name: 'More',
          children: this.areas
      },
      ];
      this.dataSource.data = TREE_DATA;
      this.dataSource1.data = TREE_DATA;
      this.dataSource2.data = TREE_DATA;
    });
  }

  back(): void {
    this.router.navigate(["dashboard/clients"]);
  }

  add(): void {
    this.openDialog(false);
  }

  info(): void{
    this.router.navigate(["dashboard/info"], { state: { data: 4 } });
  }


  openDialog(isEdit: boolean, value = null): void {
    let dialogRef;
    if (isEdit == false){
      // console.log(isEdit);
      dialogRef = this.dialog.open(DepartmentAddComponent , {
        data: {dialogTitle: "Add Department"}
      });
    }

    dialogRef.afterClosed().subscribe(res => {
      // console.log('The dialog was closed');

      this.apiService.fetchAllDepartments().subscribe((res) => {
        this.departments = res;
        this.departmentSize = res.length;
      });

    });
    
  }

  more(): void {
    this.collapsed = !this.collapsed;
  }

}
