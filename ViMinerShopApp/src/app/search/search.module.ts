import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { RouterModule } from '@angular/router';
import { SearchRoutes } from './search.routes';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SearchRoutes),
    TranslateModule
  ],
  declarations: [SearchComponent],
  providers: [TranslatePipe]
})
export class SearchModule {
}
