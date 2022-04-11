import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageSlideComponent } from './home-page-slide/home-page-slide.component';
import { AddNewHomePageSlideComponent } from './add-new-home-page-slide/add-new-home-page-slide.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditHomePageSlideComponent } from './edit-home-page-slide/edit-home-page-slide.component';
import { EditNotificationComponent } from './edit-notification/edit-notification.component';



@NgModule({
  declarations: [HomePageSlideComponent, AddNewHomePageSlideComponent, EditHomePageSlideComponent, EditNotificationComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SiteSettingsModule { }
