import { SummaryComponent } from './summary/summary.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { RouterModule } from '@angular/router';
import { CheckoutRoutes } from './checkout.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './payment/payment.component';
import { CheckoutGuardService } from '../services/checkout-guard.service';
import { OrderInfoComponent } from './orderInfo/orderInfo.component';
import { StepDivisionComponent } from './step-division/step-division.component';
import { AddressModule } from '../address/address.module';
import { DonateCouponModule } from '../donate-coupon/donate-coupon.module';
import { NgxPayPalModule } from 'ngx-paypal';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CheckoutRoutes),
    ReactiveFormsModule,
    NgbModule,
    AddressModule,
    DonateCouponModule,
    NgxPayPalModule,
    TranslateModule
  ],
  declarations: [CheckoutComponent, SummaryComponent,
    PaymentComponent,
    OrderInfoComponent, StepDivisionComponent],
  providers: [CheckoutGuardService, TranslatePipe],
  bootstrap: []
})
export class CheckoutModule {
}
