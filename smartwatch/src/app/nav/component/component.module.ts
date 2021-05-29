import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertComponent } from './modal/alert/alert.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmComponent } from './modal/confirm/confirm.component';

@NgModule({
  imports: [
    CommonModule,
     MatDialogModule,
     MatIconModule,
     MatDividerModule,
     MatButtonModule,
  ],
  declarations: [AlertComponent, ConfirmComponent],
  entryComponents: [AlertComponent]
})
export class ComponentModule { }