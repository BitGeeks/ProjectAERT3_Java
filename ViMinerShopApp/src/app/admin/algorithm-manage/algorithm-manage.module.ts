import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAlgorithmComponent } from './add-algorithm/add-algorithm.component';
import { ManageAlgorithmComponent } from './manage-algorithm/manage-algorithm.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditAlgorithmDialogComponent } from './edit-algorithm-dialog/edit-algorithm-dialog.component';



@NgModule({
  declarations: [AddAlgorithmComponent, ManageAlgorithmComponent, EditAlgorithmDialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AlgorithmManageModule { }
