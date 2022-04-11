import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewInventoryComponent } from './add-new-inventory/add-new-inventory.component';
import { ManageInventoryComponent } from './manage-inventory/manage-inventory.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditInventoryDialogComponent } from './edit-inventory-dialog/edit-inventory-dialog.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    AddNewInventoryComponent,
    ManageInventoryComponent,
    EditInventoryDialogComponent
  ]
})
export class InventoryManageModule { }
