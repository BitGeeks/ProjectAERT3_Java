import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail.component';
import { RouterModule } from '@angular/router';
import { ProductDetailRoutes } from './product-detail.routes';
import { RelatedComponent } from './related/related.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProductDetailRoutes),
    ReactiveFormsModule,
    NgbModule,
    NgxImageZoomModule,
    TranslateModule
  ],
  declarations: [ProductDetailComponent, RelatedComponent],
  providers: [TranslatePipe]
})
export class ProductDetailModule {
}
