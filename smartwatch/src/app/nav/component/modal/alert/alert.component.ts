import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ModalAlertData
  ) { }

  getAlertIcon() {
    switch (this.data.alertType) {
      case AlertType.INFO:
        return 'info';
      case AlertType.WARNING:
        return 'warning';
      case AlertType.ERROR:
        return 'error';
    }
  }

  getColor() {
    switch (this.data.alertType) {
      case AlertType.INFO:
        return '#f0ad4e';
      case AlertType.WARNING:
        return '#e13026';
      case AlertType.ERROR:
        return '#67bf40';
    }
  }

}

export class ModalAlertData {
  title: string;
  content: string;
  alertType: AlertType;
  closeButtonLabel: string;

  constructor(data?) {
    if (data) {
      this.title = data.title;
      this.content = data.content;
      this.alertType = data.alertType;
      this.closeButtonLabel = data.closeButtonLabel;
    }
  }
}

export enum AlertType {
  INFO, WARNING, ERROR
}

