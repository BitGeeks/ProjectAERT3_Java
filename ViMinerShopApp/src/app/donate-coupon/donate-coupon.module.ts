import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonateDialogComponent } from './donate-dialog/donate-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [DonateDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class DonateCouponModule { }
