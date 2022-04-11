import { Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { PaymentComponent } from './payment/payment.component';
import { CheckoutGuardService } from '../services/checkout-guard.service';
import { OrderInfoComponent } from './orderInfo/orderInfo.component';

export const CheckoutRoutes: Routes = [
  {
    path: '', component: CheckoutComponent,
    canActivate: [AuthGuardService, CheckoutGuardService],
    canDeactivate: [CheckoutGuardService],
    canActivateChild: [CheckoutGuardService]
  },
  {
    path: 'payment/:orderId', component: PaymentComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'orderInfo/:orderId', component: OrderInfoComponent,
    canActivate: [AuthGuardService],
  }
];
