import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatCardModule, MatToolbarModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatButtonToggleModule, MatIconModule, MatRadioButton, MatRadioGroup, MatRippleModule, MatOptionModule, MatSelectModule, MatTableModule,} from '@angular/material';
import {RouterModule, Routes} from '@angular/router';
import {RepairServicesComponent} from './repair-services.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatRippleModule,
    MatIconModule,
    MatCheckboxModule,
    RouterModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatButtonModule,
    HttpModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule,
    RepairServicesComponent,
  ],
  declarations: []
})
export class RepairServicesModule { }
