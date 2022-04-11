import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import { Algorithm } from 'src/app/store/model';
import { EditProductDialogComponent } from '../../product-manage/edit-product-dialog/edit-product-dialog.component';
import { EditAlgorithmDialogComponent } from '../edit-algorithm-dialog/edit-algorithm-dialog.component';

@Component({
  selector: 'app-manage-algorithm',
  templateUrl: './manage-algorithm.component.html',
  styleUrls: ['./manage-algorithm.component.scss']
})
export class ManageAlgorithmComponent implements OnInit {
  algorithmList: Array<Algorithm>;

  page = 0;
  pageSize = 3;
  collectionSize = 0;
  pageLimit = 0;
  disablePrevPageBtn = true;
  disableNextPageBtn = true;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private modalService: NgbModal,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.adminService.getAllAlgorithmCount()
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
          this.getAlgorithms();
      });
  }

  getAlgorithms() {
    this.adminService.getAlgorithmList(this.page)
      .pipe(take(1), catchError(
        error => {
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.algorithmList = data;
    });
  }

  editAlgorithm(algorithm: Algorithm) {
    const EditAlgorithm = this.modalService.open(EditAlgorithmDialogComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    EditAlgorithm.componentInstance.FormSubmittedEv.subscribe($e => this.getAlgorithms());
    EditAlgorithm.componentInstance.FormExceptionOccurEv.subscribe($e => this.onException($e));
    EditAlgorithm.componentInstance.initialState = algorithm;
  }

  onException(ev: string) {
    this.notifierService.notify('error', ev);
  }

  userClickNextPage() {
    if (this.disableNextPageBtn) { return; }
    this.page += 1;
    if (this.page + 1 === this.pageLimit) { this.disableNextPageBtn = true; }
    if (this.page !== 0) { this.disablePrevPageBtn = false; }
    this.getAlgorithms();
  }

  userClickPreviousPage() {
    if (this.disablePrevPageBtn) { return; }
    this.page -= 1;
    if (this.page < this.pageLimit) { this.disableNextPageBtn = false; }
    if (this.page !== 0) { this.disablePrevPageBtn = false; }
    else { this.disablePrevPageBtn = true; }
    this.getAlgorithms();
  }
}
