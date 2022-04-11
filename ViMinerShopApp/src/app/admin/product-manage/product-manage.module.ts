import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditProductDialogComponent } from './edit-product-dialog/edit-product-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    AddNewProductComponent,
    ManageProductComponent,
    EditProductDialogComponent
  ]
})
export class ProductManageModule { }
