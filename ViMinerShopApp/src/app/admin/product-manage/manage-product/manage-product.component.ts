import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { NotifierService } from 'angular-notifier';
import { Observable, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { BrowseState } from 'src/app/store/browse/browse.reducer';
import { ProductDetail } from 'src/app/store/model';
import * as fromApp from '../../../store/app.reducers';
import * as BrowseActions from '../../../store/browse/browse.actions';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';
import { abbreviateNumber } from 'src/utils/converters/abbr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {
  browseState: Observable<BrowseState>;
  currentProductNum = 0;

  page = 0;
  pageSize = 3;
  collectionSize = 0;
  pageLimit = 0;
  disablePrevPageBtn = true;
  disableNextPageBtn = true;

  productList: Array<ProductDetail>;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private modalService: NgbModal,
    private notifierService: NotifierService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.adminService.getAllProductCount()
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
          this.pageNavigation();
      });
  }

  pageNavigation() {
    this.adminService.getAllProducts(this.page)
      .pipe(take(1), catchError(
        error => {
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.productList = data;
      });
  }

  editProduct(product: ProductDetail) {
    const EditProduct = this.modalService.open(EditProductDialogComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    EditProduct.componentInstance.FormSubmittedEv.subscribe($e => this.pageNavigation());
    EditProduct.componentInstance.FormExceptionOccurEv.subscribe($e => this.onException($e));
    EditProduct.componentInstance.initialState = product;
  }

  onException(ev: string) {
    this.notifierService.notify('error', ev);
  }

  abbreviateNumber = (num: number) => abbreviateNumber(num);

  userClickNextPage() {
    if (this.disableNextPageBtn) { return; }
    this.page += 1;
    if (this.page + 1 === this.pageLimit) { this.disableNextPageBtn = true; }
    if (this.page !== 0) { this.disablePrevPageBtn = false; }
    this.pageNavigation();
  }

  userClickPreviousPage() {
    if (this.disablePrevPageBtn) { return; }
    this.page -= 1;
    if (this.page < this.pageLimit) { this.disableNextPageBtn = false; }
    if (this.page !== 0) { this.disablePrevPageBtn = false; }
    else { this.disablePrevPageBtn = true; }
    this.pageNavigation();
  }
}
