import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { Subscription, throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import { RepairService } from 'src/app/services/repair.service';
import { Repair, RepairSite, ShippingMethod } from 'src/app/store/model';

@Component({
  selector: 'app-repair-ticket-details',
  templateUrl: './repair-ticket-details.component.html',
  styleUrls: ['./repair-ticket-details.component.scss']
})
export class RepairTicketDetailsComponent implements OnInit {
  paramSubscription: Subscription;

  ticketId: number;
  repairSitePreconfig: Array<RepairSite>;
  shippingMethods: Array<ShippingMethod>;
  repairSiteName: string;
  shippingUnitName: string;
  returnShippingUnitName: string;

  ticketData: Repair;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private repairService: RepairService,
    private accountService: AccountService,
    private titleMeta: Title,
    private translatePipe: TranslatePipe,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.ticketId = params.ticketId;
        this.repairService.getRepairTicket(params.ticketId).pipe(take(1), catchError(error => {
            this.router.navigate([`/account/repair/tickets`]);
            return throwError(error);
          }
          )).subscribe(data => {
            this.titleMeta.setTitle(this.translatePipe.transform('Chi tiết phiếu sửa chữa mã ') + params.ticketId);
            this.ticketData = data;
            this.requestRepairSite(data.repairSiteId);
            this.getShippingMethod();
          });
      });
  }

  requestRepairSite(repairSiteId: string) {
    this.repairService.getRepairSite().pipe(take(1), catchError(error => {
      return throwError(error);
    }
    )).subscribe(data => {
      this.repairSiteName = data.filter(d => d.code === repairSiteId)[0].name;
    });
  }

  setShippingName(id: number, isShipping: boolean) {
    if (isShipping) {
      this.shippingUnitName = this.shippingMethods.filter(d => d.id === id)[0].shortName;
    }
    else {
      this.returnShippingUnitName = this.shippingMethods.filter(d => d.id === id)[0].shortName;
    }
    }

  getShippingMethod() {
    this.accountService.getShippingMethods().pipe(take(1), catchError(error => {
      return throwError(error);
    }
    )).subscribe(data => {
      this.shippingMethods = data;
      this.setShippingName(this.ticketData.shippingLogisticsId, true);
      this.setShippingName(this.ticketData.returnLogisticsId, false);
    });
  }

  onUserClickDelete() {
    this.repairService.cancelRepairTicket(this.ticketData.id).pipe(take(1), catchError(error => {
      this.notifierService.notify('error', this.translatePipe.transform('Đã có lỗi xảy ra trong quá trình hủy phiếu sửa chữa!'));
      return throwError(error);
    }
    )).subscribe(() => {
      this.notifierService.notify('success', this.translatePipe.transform('Hủy phiếu sửa chữa thành công'));
      this.router.navigate([`/account/repair/tickets`]);
    });
  }

  onUserClickEdit() {
    this.router.navigate([`/account/repair/create/${this.ticketData.id}`]);
  }


  renderStatus = (status) => {
    switch (status) {
      case 0:
        return this.translatePipe.transform('Chưa nhận');
      case 1:
        return this.translatePipe.transform('Đã nhận');
      case 2:
        return this.translatePipe.transform('Đang chờ');
      case 3:
        return this.translatePipe.transform('Sẽ nhận sau');
      case 4:
        return this.translatePipe.transform('Đã hoàn thành');
      default:
        return this.translatePipe.transform('Đã hủy bỏ');
    }
  }
}
