import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import { BrowseState } from 'src/app/store/browse/browse.reducer';
import { ProductCategory } from 'src/app/store/model';
import * as fromApp from '../../../store/app.reducers';
import * as BrowseActions from '../../../store/browse/browse.actions';
import { EditCategoryDialogComponent } from '../edit-category-dialog/edit-category-dialog.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {
  browseState: Observable<BrowseState>;
  currentPage = 0;

  constructor(
    private store: Store<fromApp.AppState>,
    private adminService: AdminService,
    private notifierService: NotifierService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.browseState = this.store.select('browse');

    this.getCategories();
  }

  getCategories() {
    this.store.dispatch(new BrowseActions.FetchCategory());
  }

  editCategory(category: ProductCategory) {
    const EditCategory = this.modalService.open(EditCategoryDialogComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    EditCategory.componentInstance.FormSubmittedEv.subscribe($e => this.getCategories());
    EditCategory.componentInstance.FormExceptionOccurEv.subscribe($e => this.onException($e));
    EditCategory.componentInstance.initialState = category;
  }

  onException(ev: string) {
    this.notifierService.notify('error', ev);
  }
}
