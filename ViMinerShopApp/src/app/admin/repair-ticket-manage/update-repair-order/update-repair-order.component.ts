import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-update-repair-order',
  templateUrl: './update-repair-order.component.html',
  styleUrls: ['./update-repair-order.component.scss']
})
export class UpdateRepairOrderComponent implements OnInit {
  updateRepairOrderStatus: FormGroup;

  @Input()
  public initialState: { [key: string]: any };

  @Output()
  public FormSubmittedEv = new EventEmitter<boolean>();

  @Output()
  public FormExceptionOccurEv = new EventEmitter<string>();

  @Output()
  public FormCloseEv = new EventEmitter<boolean>();

  constructor(
    public activeModal: NgbActiveModal,
    private adminService: AdminService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.updateRepairOrderStatus = new FormGroup({
      id: new FormControl(null, []),
      repairOrderStatus: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required])
    });
    this.updateRepairOrderStatus.patchValue({
      id: this.initialState.id,
      repairOrderStatus: this.initialState.repairOrderStatus,
      price: this.initialState.price
    });
  }

  onEditSubmitted() {
    if (!this.updateRepairOrderStatus.valid) { return; }
    const { id, repairOrderStatus, price } = this.updateRepairOrderStatus.value;
    this.adminService.editRepairOrderStatus(id, repairOrderStatus, price)
      .pipe(take(1), catchError(
        error => {
          this.FormExceptionOccurEv.emit(error);
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.FormSubmittedEv.emit(true);
        this.notifierService.notify('success', 'Cập nhật trạng thái đơn sửa chữa thành công!');
        this.activeModal.close('Close click');
    });
  }

  onUserClickClose() {
    this.activeModal.close('Close click');
  }

}
