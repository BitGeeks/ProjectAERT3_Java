import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditCategoryDialogComponent } from './edit-category-dialog/edit-category-dialog.component';



@NgModule({
  declarations: [AddCategoryComponent, ManageCategoryComponent, EditCategoryDialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CategoryManageModule { }
