import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { AdminRoutes } from './admin.routes';
import { AdGuardService } from '../services/ad-guard.service';
import { TransactionManageComponent } from './transaction-manage/transaction-manage.component';
import { RepairTicketManageComponent } from './repair-ticket-manage/repair-ticket-manage.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { AppChangelogComponent } from './dashboard/app-changelog/app-changelog.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
    HighchartsChartModule
  ],
  declarations: [
    DashboardComponent, AdminComponent,
    TransactionManageComponent,
    RepairTicketManageComponent,
    AppChangelogComponent
  ],
  providers: [AdGuardService, DatePipe]
})
export class AdminModule { }
