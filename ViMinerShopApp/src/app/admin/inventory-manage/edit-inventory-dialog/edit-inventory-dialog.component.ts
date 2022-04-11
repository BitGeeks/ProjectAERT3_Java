import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-inventory-dialog',
  templateUrl: './edit-inventory-dialog.component.html',
  styleUrls: ['./edit-inventory-dialog.component.scss']
})
export class EditInventoryDialogComponent implements OnInit {
  editInventory: FormGroup;

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
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.editInventory = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required]),
      flag: new FormControl(null, []),
      hps: new FormControl(null, [Validators.required]),
      weight: new FormControl(null, [Validators.required]),
      shippingInfo: new FormControl(null, [])
    });
    this.editInventory.patchValue({
      id: this.initialState.id,
      quantity: this.initialState.quantity,
      flag: this.initialState.flag,
      hps: this.initialState.hps,
      weight: this.initialState.weight,
      shippingInfo: this.initialState.shippingInfo
    });
  }

  onEditSubmitted() {
    if (!this.editInventory.valid) { return; }
    const { id, quantity, flag, hps, weight, shippingInfo } = this.editInventory.value;
    this.adminService.updateInventory(id, quantity, flag, hps, weight, shippingInfo).pipe(take(1), catchError(
      error => {
        this.FormExceptionOccurEv.emit(error);
        return throwError(error);
      }
    ))
    .subscribe(data => {
      this.FormSubmittedEv.emit(true);
      this.onUserClickClose();
    });
  }

  onUserClickClose() {
    this.FormCloseEv.emit(true);
    this.activeModal.close('Close click');
  }

}
