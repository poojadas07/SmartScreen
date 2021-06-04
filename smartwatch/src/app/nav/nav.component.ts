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
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Countries',
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
                            {
                              name: 'Screen A'
                            },
                            {
                              name: 'Screen B'
                            },
                            {
                              name: 'Screen C'
                            },
                          ]
                        },
                        {
                          name: 'Management'
                        },
                      ]
                    },
                    {
                      name: 'Country Manager'
                    },
                  ]
                },
            {
              name: 'Western'
            },
          ]
        },
        {
          name: 'Jamshedpur'
        },
      ]
    },
    {
      name: 'United Kingdom'
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

  constructor(private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private modalService: ModalService,
    private router: Router ,
    private apiService: ApiService) 
    {
      this.dataSource.data = TREE_DATA;
    }

  ngOnInit(): void {
    this.apiService.fetchAllCountries().subscribe((res) => {
      this.menuItems1 = res;
    });
  }

  openDialog() {
    this.dialog.open(ShareComponent);
  }

  menuItems = ['countries', 'regions' , 'locations' , 'clients' , 'departments' , 'screens'];

  panelOpenState = false;

  navigateToPage(name: string) {
    console.log(name);
    // if (name === 'Screen A') {
      this.router.navigate(["dashboard/info"]);
    // }
  }

  logout(): void {
    this.modalService.openConfirmModal('Are you sure you want to exit?', (answer: boolean) => {
      if (answer) {
        this.router.navigate(["login"]);
      }
    });
  }

}
