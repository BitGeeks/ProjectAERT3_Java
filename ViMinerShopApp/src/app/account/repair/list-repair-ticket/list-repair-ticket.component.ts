import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { RepairService } from 'src/app/services/repair.service';
import { Repair, repairItemT } from 'src/app/store/model';

@Component({
  selector: 'app-list-repair-ticket',
  templateUrl: './list-repair-ticket.component.html',
  styleUrls: ['./list-repair-ticket.component.scss']
})
export class ListRepairTicketComponent implements OnInit {
  noOrders = false;
  innerLoading = true;

  pageSize: number;
  pageLimit: number;
  collectionSize: number;
  page = 0;
  productSlice: Array<repairItemT>;

  rOrders: Array<any>;
  activeTab = 1;

  searchTxt = '';

  isExpand = {};

  disablePrevPageBtn = true;
  disableNextPageBtn = true;

  fetchError = false;

  constructor(
    private repairService: RepairService,
    private router: Router,
    private titleMeta: Title,
    private translatePipe: TranslatePipe,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.titleMeta.setTitle(this.translatePipe.transform('Danh sách phiếu sửa chữa'));
    this.initPaginate();
  }

  initPaginate() {
    this.disableNextPageBtn = true;
    this.disablePrevPageBtn = true;
    this.repairService.getRepairOrderCount(this.activeTab - 2)
      .pipe()
      .subscribe((data: number) => {
        if (data === 0) {
          this.noOrders = true;
          this.innerLoading = false;
          this.rOrders = [];
        } else {
          this.noOrders = false;
          this.pageSize = this.repairService.getPageSize();
          this.pageLimit = Math.ceil(data / this.repairService.getPageSize());
          this.collectionSize = data;
          if (this.pageLimit > 1) { this.disableNextPageBtn = false; }
          this.pageNavigationByType();
        }
      });
  }

  onUserClickSearch(txtSearch: string) {
    this.repairService.searchByTxt(this.page, this.activeTab - 2, txtSearch)
      .pipe(take(1), catchError(
        error => {
          this.fetchError = true;
          this.innerLoading = false;
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.noOrders = false;
        data.map(d => this.isExpand[d["id"]] = false);
        this.rOrders = data;
        this.innerLoading = false;
      });
  }

  pageNavigation() {
    this.rOrders = [];
    this.innerLoading = true;
    this.repairService.getRepairList(this.page)
      .pipe(take(1), catchError(
        error => {
          this.fetchError = true;
          this.innerLoading = false;
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.noOrders = false;
        data.map(d => this.isExpand[d["id"]] = false);
        this.rOrders = data;
        this.innerLoading = false;
      });
  }

  pageNavigationByType() {
    this.rOrders = [];
    this.innerLoading = true;
    this.repairService.getRepairListByTab(this.page, this.activeTab - 2)
      .pipe(take(1), catchError(
        error => {
          this.fetchError = true;
          this.innerLoading = false;
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.rOrders = data;
        this.innerLoading = false;
      });
  }

  onUserClickDelete(ticket: Repair) {
    if (ticket.status !== 0) {
      this.notifierService.notify('error', this.translatePipe.transform('Bạn không thể xoá phiếu sửa chữa này!'));
      return;
    }
    this.repairService.cancelRepairTicket(ticket.id).pipe(take(1), catchError(error => {
      this.notifierService.notify('error', this.translatePipe.transform('Đã có lỗi xảy ra trong quá trình hủy phiếu sửa chữa!'));
      return throwError(error);
    }
    )).subscribe(() => {
      this.initPaginate();
    });
  }

  onUserClickTab(tabNum, isDirectClick) {
    if (this.activeTab === tabNum) { return; }
    if (isDirectClick) { this.searchTxt = ''; }
    this.activeTab = tabNum;
    this.initPaginate();
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

  userClickNextPage() {
    if (this.disableNextPageBtn) { return; }
    this.page += 1;
    if (this.page >= this.pageLimit) { this.disableNextPageBtn = true; }
    else { this.disablePrevPageBtn = false; }
    this.pageNavigationByType();
  }

  userClickPreviousPage() {
    if (this.disablePrevPageBtn) { return; }
    this.page -= 1;
    if (this.page < this.pageLimit) { this.disableNextPageBtn = false; }
    if (this.page !== 0) { this.disablePrevPageBtn = false; }
    else { this.disablePrevPageBtn = true; }
    this.pageNavigationByType();
  }

}
