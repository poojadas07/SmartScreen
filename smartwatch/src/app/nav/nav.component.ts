import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {MatDialog} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ShareComponent } from './share/share.component';
import { ModalService } from '../service/modal.service';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

interface FoodNode {
  _id: any;
  name: string;
  children?: FoodNode[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  _id: string;
  level: number;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      _id: node._id,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  menuItems1: any;
  areas: any;
  id: string;
  name: any;

  constructor(private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private modalService: ModalService,
    private router: Router ,
    private apiService: ApiService) 
    { }

  ngOnInit(): void {
    this.apiService.fetchAllCountries().subscribe((res) => {
      this.menuItems1 = res;
    });

    this.id = localStorage.getItem('token');  
    console.log(this.id);

    this.apiService.fetchUserById(this.id).subscribe((res) => {
      this.name = res.username || 'My Profile';
    });

    this.apiService.fetchPoPCountry().subscribe((res) => {
      this.areas = res;
      const TREE_DATA = [
        {
          name: 'Countries',
          children: this.areas,
          _id: ""
      },
      ];
      this.dataSource.data = TREE_DATA;
    });
  }

  openDialog() {
    this.dialog.open(ShareComponent);
  }

  menuItems = ['countries', 'regions' , 'locations' , 'clients' , 'departments' , 'screens'];

  panelOpenState = false;

  logout(): void {
    this.modalService.openConfirmModal('Are you sure you want to exit?', (answer: boolean) => {
      if (answer) {
        this.apiService.logout();
        this.router.navigate(["login"]);  
      }
    });
  }

  gotoScreen(node): void{
    if (node.level == 6){
      this.router.navigate(['dashboard/screen/' + node._id]);
    }
  }

}
