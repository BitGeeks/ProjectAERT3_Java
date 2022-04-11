import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingManageComponent } from './shipping-manage.component';
import { AddShippingMethodComponent } from './add-shipping-method/add-shipping-method.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditShippingMethodDialogComponent } from './edit-shipping-method-dialog/edit-shipping-method-dialog.component';



@NgModule({
  declarations: [ShippingManageComponent, AddShippingMethodComponent, EditShippingMethodDialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ShippingManageModule { }
