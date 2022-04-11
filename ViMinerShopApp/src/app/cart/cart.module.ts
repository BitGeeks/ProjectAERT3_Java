import { CartComponent } from './cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CartRoutes } from './cart.routes';
import { EmptyCartComponent } from './empty-cart/empty-cart.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CartRoutes),
    ReactiveFormsModule,
    NgbModule,
    TranslateModule
  ],
  declarations: [CartComponent, EmptyCartComponent],
  providers: [TranslatePipe]
})
export class CartModule {
}
