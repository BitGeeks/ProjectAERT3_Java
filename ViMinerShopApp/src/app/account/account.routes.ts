import { SubcriptionsComponent } from './subcriptions/subcriptions.component';
import { AddressComponent } from './address/address.component';
import { Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { InfoComponent } from './info/info.component';
import { ListRepairOrdersComponent } from './repair/list-repair-orders/list-repair-orders.component';
import { RepairComponent } from './repair/repair.component';
import { CreateRepairTicketComponent } from './repair/create-repair-ticket/create-repair-ticket.component';
import { ListRepairTicketComponent } from './repair/list-repair-ticket/list-repair-ticket.component';
import { RepairTicketDetailsComponent } from './repair/repair-ticket-details/repair-ticket-details.component';
import { ListDiscountComponent } from './list-discount/list-discount.component';
import { ListDiscountTransactionComponent } from './list-discount-transaction/list-discount-transaction.component';
import { RecordsComponent } from './records/records.component';
import { ReferralsComponent } from './referrals/referrals.component';


export const AccountRoutes: Routes = [
  {
    path: '', component: AccountComponent, canActivate: [AuthGuardService],
    children: [
      { path: 'info', component: InfoComponent },
      { path: 'orders', component: ListOrdersComponent },
      { path: 'address', component: AddressComponent },
      { path: 'subscription', component: SubcriptionsComponent },
      {
        path: 'repair', component: RepairComponent,
        children: [
          { path: 'tickets', component: ListRepairTicketComponent },
          { path: 'ticket/:ticketId', component: RepairTicketDetailsComponent },
          { path: 'orders', component: ListRepairOrdersComponent },
          { path: 'create', component: CreateRepairTicketComponent },
          { path: 'create/:ticketId', component: CreateRepairTicketComponent }
        ]
      },
      { path: 'couponList', component: ListDiscountComponent },
      { path: 'couponDonate', component: ListDiscountTransactionComponent },
      { path: 'records', component: RecordsComponent },
      { path: 'referrals', component: ReferralsComponent }
    ]
  }
];
