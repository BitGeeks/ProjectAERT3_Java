import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import { productInventory } from 'src/app/store/model';
import { EditInventoryDialogComponent } from '../edit-inventory-dialog/edit-inventory-dialog.component';
import { abbreviateNumber } from 'src/utils/converters/abbr';

@Component({
  selector: 'app-manage-inventory',
  templateUrl: './manage-inventory.component.html',
  styleUrls: ['./manage-inventory.component.scss']
})
export class ManageInventoryComponent implements OnInit {
  inventoryList: Array<productInventory>;
  currentPage = 0;

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.getInventory();
  }

  abbreviateNumber = (num: number) => abbreviateNumber(num);

  getInventory() {
    this.adminService.getInventoryList(this.currentPage)
      .pipe(take(1), catchError(
        error => {
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.inventoryList = data;
    });
  }

  userClickNextPage = () => {
    this.currentPage++;
    this.getInventory ();
  }

  userClickPreviousPage = () => {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getInventory ();
    }
  }

  editInventory(inventory: productInventory) {
    const EditInventory = this.modalService.open(EditInventoryDialogComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    EditInventory.componentInstance.FormSubmittedEv.subscribe($e => this.getInventory());
    EditInventory.componentInstance.FormExceptionOccurEv.subscribe($e => this.onException($e));
    EditInventory.componentInstance.initialState = inventory;
  }

  onException(ev: string) {
    this.notifierService.notify('error', ev);
  }

}
