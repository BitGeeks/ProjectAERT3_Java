import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import { RepairSite } from 'src/app/store/model';
import { EditRepairSiteComponent } from '../edit-repair-site/edit-repair-site.component';

@Component({
  selector: 'app-manage-repair-site',
  templateUrl: './manage-repair-site.component.html',
  styleUrls: ['./manage-repair-site.component.scss']
})
export class ManageRepairSiteComponent implements OnInit {
  repairSiteList: Array<RepairSite>;

  page = 0;
  pageSize = 3;
  collectionSize = 0;
  pageLimit = 0;
  disablePrevPageBtn = true;
  disableNextPageBtn = true;

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.adminService.getAllRepairSiteCount()
      .pipe(take(1), catchError(
        error => {
          this.notifierService.notify('error', 'Có lỗi xảy ra trong quá trình thao tác!');
          return throwError(error);
        }
      ))
      .subscribe((data: number) => {
          this.pageSize = this.adminService.getPageSize();
          this.pageLimit = Math.ceil(data / this.adminService.getPageSize());
          this.collectionSize = data;
          if (this.pageLimit > 1) { this.disableNextPageBtn = false; }
          this.getSiteList();
      });
  }

  getSiteList() {
    this.adminService.getRepairSiteList(this.page)
      .pipe(take(1), catchError(
        error => {
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.repairSiteList = data;
    });
  }

  editRepairSite(site: RepairSite) {
    const EditRepairSite = this.modalService.open(EditRepairSiteComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    EditRepairSite.componentInstance.FormSubmittedEv.subscribe($e => this.getSiteList());
    EditRepairSite.componentInstance.FormExceptionOccurEv.subscribe($e => this.onException($e));
    EditRepairSite.componentInstance.initialState = site;
  }

  onException(ev: string) {
    this.notifierService.notify('error', ev);
  }

  userClickNextPage() {
    if (this.disableNextPageBtn) { return; }
    this.page += 1;
    if (this.page >= this.pageLimit - 1) { this.disableNextPageBtn = true; }
    else { this.disablePrevPageBtn = false; }
    this.getSiteList();
  }

  userClickPreviousPage() {
    if (this.disablePrevPageBtn) { return; }
    this.page -= 1;
    if (this.page < this.pageLimit) { this.disableNextPageBtn = false; }
    if (this.page !== 0) { this.disablePrevPageBtn = false; }
    else { this.disablePrevPageBtn = true; }
    this.getSiteList();
  }
}
