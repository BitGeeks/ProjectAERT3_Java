import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ARepairTicketDetailsComponent } from './arepair-ticket-details/arepair-ticket-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UpdateRepairOrderComponent } from './update-repair-order/update-repair-order.component';


@NgModule({
  declarations: [ARepairTicketDetailsComponent, UpdateRepairOrderComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RepairTicketManageModule { }
