import { AuthGuardService } from './../services/auth-guard.service';
import { SubcriptionsComponent } from './subcriptions/subcriptions.component';
import { InfoComponent } from './info/info.component';
import { AddressComponent } from './address/address.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { RouterModule } from '@angular/router';
import { AccountRoutes } from './account.routes';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListDiscountComponent } from './list-discount/list-discount.component';
import { ListDiscountTransactionComponent } from './list-discount-transaction/list-discount-transaction.component';
import { ListRepairOrdersComponent } from './repair/list-repair-orders/list-repair-orders.component';
import { CreateRepairTicketComponent } from './repair/create-repair-ticket/create-repair-ticket.component';
import { ListRepairTicketComponent } from './repair/list-repair-ticket/list-repair-ticket.component';
import { RepairComponent } from './repair/repair.component';
import { RepairTicketDetailsComponent } from './repair/repair-ticket-details/repair-ticket-details.component';
import { AddressModule } from '../address/address.module';
import { DonateCouponModule } from '../donate-coupon/donate-coupon.module';
import { RecordsComponent } from './records/records.component';
import { ReferralsComponent } from './referrals/referrals.component';
import { RepairOrderPaymentDialogComponent } from './repair/repair-order-payment-dialog/repair-order-payment-dialog.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AvatarUploadDialogComponent } from './info/avatar-upload-dialog/avatar-upload-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AccountRoutes),
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    AddressModule,
    DonateCouponModule,
    NgxPayPalModule,
    TranslateModule,
    ImageCropperModule
  ],
  declarations: [ListRepairOrdersComponent, CreateRepairTicketComponent, ListRepairTicketComponent, AccountComponent, ListOrdersComponent, AddressComponent, SubcriptionsComponent,
    InfoComponent, ListDiscountComponent, ListDiscountTransactionComponent, RepairComponent, RepairTicketDetailsComponent, RecordsComponent, ReferralsComponent, RepairOrderPaymentDialogComponent, AvatarUploadDialogComponent],
  providers: [AuthGuardService, TranslatePipe]
})
export class AccountModule {
}
