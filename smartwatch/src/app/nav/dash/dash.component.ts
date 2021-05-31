import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  screens: any;

  constructor(private apiService: ApiService,private modalService: ModalService) {}

  ngOnInit(): void {

    this.bindPanelData();

  }

  openInfoModal() {
    this.modalService.openInfoModal('Hello Info');
  }

  openWarningModal() {
    this.modalService.openWarningModal('Are you sure ??');
    console.log(2);
  }

  openErrorModal() {
    this.modalService.openErrorModal('Hello Error');
  }


  bindPanelData(): void {
    this.apiService.fetchAllScreens().subscribe((res) => {
      this.screens = res;
      // this.screensSize = res.length;
      console.log(res);

      for (let i = 0; i < res.length; i++) {
        this.apiService.fetchPanelByScreen(this.screens[i].screenId).subscribe((res) => {
          this.screens[i].panels = res;

          console.log(res);
          for (let j = 0; j < this.screens[i].panels.length; j++) {
            this.screens[i].panels[j].index = j+1;
          }
        });
      }
    });
  }

  getColor(panel) {
    if (panel.currentValue == null) {
      return '#d3d3d3';
    }
    else if (panel.currentValue == '0') {
      return '#e13026'; // Red Accent color
    } else {
      return '#67bf40' // Green Accent Color
    }
  }

}
