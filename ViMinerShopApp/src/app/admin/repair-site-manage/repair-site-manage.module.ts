import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewRepairSiteComponent } from './add-new-repair-site/add-new-repair-site.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ManageRepairSiteComponent } from './manage-repair-site/manage-repair-site.component';
import { EditRepairSiteComponent } from './edit-repair-site/edit-repair-site.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [AddNewRepairSiteComponent, ManageRepairSiteComponent, EditRepairSiteComponent]
})
export class RepairSiteManageModule { }
