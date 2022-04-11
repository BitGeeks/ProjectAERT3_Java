import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import { Repair, repairItemT } from 'src/app/store/model';
import { ARepairTicketDetailsComponent } from './arepair-ticket-details/arepair-ticket-details.component';
import { UpdateRepairOrderComponent } from './update-repair-order/update-repair-order.component';

@Component({
  selector: 'app-repair-ticket-manage',
  templateUrl: './repair-ticket-manage.component.html',
  styleUrls: ['./repair-ticket-manage.component.scss']
})
export class RepairTicketManageComponent implements OnInit {
  ticketList: Array<Repair>;
  activeTab = 0;

  page = 0;
  pageSize = 3;
  pageLimit = 0;
  disablePrevPageBtn = true;
  disableNextPageBtn = true;

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.adminService.getAllRepairCount()
      .pipe(take(1), catchError(
        error => {
          this.notifierService.notify('error', 'Đã có lỗi xảy ra trong quá trình lấy đơn đặt hàng');
          return throwError(error);
        }
      ))
      .subscribe((data: number) => {
          this.pageSize = this.adminService.getPageSize();
          this.pageLimit = Math.ceil(data / this.adminService.getPageSize());
          if (this.pageLimit > 1) { this.disableNextPageBtn = false; }
          this.getRepairTicketList();
      });
  }

  getRepairTicketList() {
    this.adminService.getRepairListByType(this.page, this.activeTab)
      .pipe(take(1), catchError(
        error => {
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.ticketList = data;
    });
  }

  updateTicketStatus(ticket: Repair) {
    const TicketDetail = this.modalService.open(ARepairTicketDetailsComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    TicketDetail.componentInstance.initialState = ticket;
    TicketDetail.componentInstance.FormSubmittedEv.subscribe($e => this.getRepairTicketList());
    TicketDetail.componentInstance.FormExceptionOccurEv.subscribe($e => this.onException($e));
  }

  editOrderRepair(ticket: Repair) {
    const RepairOrderUpdate = this.modalService.open(UpdateRepairOrderComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    RepairOrderUpdate.componentInstance.initialState = {
      id: ticket.id,
      price: ticket.repairOrder !== null ? ticket.repairOrder.price : 0,
      repairOrderStatus: ticket.repairOrder !== null ? ticket.repairOrder.status : 0
    };
    RepairOrderUpdate.componentInstance.FormSubmittedEv.subscribe($e => this.getRepairTicketList());
    RepairOrderUpdate.componentInstance.FormExceptionOccurEv.subscribe($e => this.onException($e));
  }

  onException(ev: string) {
    this.notifierService.notify('error', ev);
  }

  renderTicketStatus = (status) => {
    switch (status) {
      case 0:
        return 'Chưa nhận';
      case 1:
        return 'Đã nhận';
      case 2:
        return 'Đang chờ';
      case 3:
        return 'Sẽ nhận sau';
      case 4:
        return 'Đã hoàn thành';
      default:
        return 'Đã hủy bỏ';
    }
  }

  renderRepairOrderStatus(status: number) {
    switch (status) {
      case 0:
        return 'Chưa thanh toán';
      case 1:
        return 'Đang chờ';
      case 2:
        return 'Đã thanh toán';
    }
  }

  onAdminSwitchTab(tabNum: number) {
    this.activeTab = tabNum;
    this.page = 0;
    this.getRepairTicketList();
  }

  userClickNextPage() {
    if (this.disableNextPageBtn) { return; }
    this.page += 1;
    if (this.page >= this.pageLimit - 1) { this.disableNextPageBtn = true; }
    else { this.disablePrevPageBtn = false; }
    this.getRepairTicketList();
  }

  userClickPreviousPage() {
    if (this.disablePrevPageBtn) { return; }
    this.page -= 1;
    if (this.page < this.pageLimit) { this.disableNextPageBtn = false; }
    if (this.page !== 0) { this.disablePrevPageBtn = false; }
    else { this.disablePrevPageBtn = true; }
    this.getRepairTicketList();
  }
}
