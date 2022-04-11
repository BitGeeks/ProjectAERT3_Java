import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './browse.component';
import { RouterModule } from '@angular/router';
import { BrowseRoutes } from './browse.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RangeFilterComponent } from './range-filter/range-filter.component';
import { SliderModule } from 'primeng/slider';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(BrowseRoutes),
    SliderModule,
    TranslateModule
  ],
  declarations: [BrowseComponent, RangeFilterComponent],
  providers: [TranslatePipe]
})
export class BrowseModule {
}
