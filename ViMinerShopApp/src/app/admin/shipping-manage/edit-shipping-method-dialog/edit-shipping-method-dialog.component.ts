import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-shipping-method-dialog',
  templateUrl: './edit-shipping-method-dialog.component.html',
  styleUrls: ['./edit-shipping-method-dialog.component.scss']
})
export class EditShippingMethodDialogComponent implements OnInit {
  editShippingMethod: FormGroup;

  @Input()
  public initialState: { [key: string]: any };

  @Output()
  public FormSubmittedEv = new EventEmitter<boolean>();

  @Output()
  public FormExceptionOccurEv = new EventEmitter<string>();

  @Output()
  public FormCloseEv = new EventEmitter<boolean>();

  constructor(
    private adminService: AdminService,
    private notifierService: NotifierService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.editShippingMethod = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      shortName: new FormControl(null, [Validators.required]),
      repairFlag: new FormControl(null, [Validators.required]),
      salesFlag: new FormControl(null, [Validators.required]),
      supportFreeShip: new FormControl(null, [Validators.required]),
      erpCode: new FormControl(null, [Validators.required]),
      logoUrl: new FormControl(null, [Validators.required]),
      avgfeeperkm: new FormControl(null, [Validators.required])
    });
    this.editShippingMethod.patchValue({
      id: this.initialState.id,
      name: this.initialState.name,
      shortName: this.initialState.shortName,
      repairFlag: this.initialState.repairFlag,
      salesFlag: this.initialState.salesFlag,
      supportFreeShip: this.initialState.supportFreeShip,
      erpCode: this.initialState.erpCode,
      logoUrl: this.initialState.logoUrl,
      avgfeeperkm: this.initialState.avgfeeperkm
    });
  }

  onEditSubmitted() {
    if (!this.editShippingMethod.valid) { return; }
    const { id, name, shortName, repairFlag, salesFlag, supportFreeShip, erpCode, logoUrl, avgfeeperkm } = this.editShippingMethod.value;
    this.adminService.editShippingMethod(id, name, shortName, repairFlag, salesFlag, supportFreeShip, erpCode, logoUrl, avgfeeperkm)
      .pipe(take(1), catchError(
        error => {
          this.FormExceptionOccurEv.emit(error);
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.FormSubmittedEv.emit(true);
        this.notifierService.notify('success', 'Sửa sản phẩm thành công!');
        this.activeModal.close('Close click');
    });
  }

  onUserClickClose() {
    this.FormCloseEv.emit(true);
    this.activeModal.close('Close click');
  }

}
