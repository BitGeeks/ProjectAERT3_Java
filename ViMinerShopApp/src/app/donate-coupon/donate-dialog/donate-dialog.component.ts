import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import { Coupon } from 'src/app/store/model';

@Component({
  selector: 'app-donate-dialog',
  templateUrl: './donate-dialog.component.html',
  styleUrls: ['./donate-dialog.component.scss']
})
export class DonateDialogComponent implements OnInit {
  donateDialog: FormGroup;

  @Input()
  couponState: Coupon;

  @Output()
  public FormSubmittedEv = new EventEmitter<boolean>();

  @Output()
  public FormExceptionOccurEv = new EventEmitter<string>();

  constructor(
    public activeModal: NgbActiveModal,
    private accountService: AccountService
    ) { }

  ngOnInit(): void {
    this.donateDialog = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      code: new FormControl(null, [Validators.required]),
      userId: new FormControl(null, [Validators.required]),
      couponType: new FormControl(null, [Validators.required]),
      receiveMail: new FormControl(null, [Validators.required]),
      couponNumber: new FormControl(null, [Validators.required])
    });
    this.donateDialog.patchValue({
      id: this.couponState.id,
      code: this.couponState.couponCode,
      userId: this.couponState.user_id,
      couponType: this.couponState.couponType,
      couponNumber: this.couponState.couponLeft
    });
  }

  onUserClickCloseDialog() {
    this.activeModal.close('Close click');
  }

  onUserCouponNumberChange(ev) {
    const { value } = ev.target;
    if (value > this.couponState.couponLeft) { this.donateDialog.patchValue({
      couponNumber: this.couponState.couponLeft
    });
    }
  }

  onDonateSubmitted() {
    if (!this.donateDialog.value.receiveMail) {
      this.FormExceptionOccurEv.emit('Bạn chưa nhập email người nhận!');
      return;
    }
    this.accountService.startDonateTransaction(this.donateDialog.value.id, this.donateDialog.value.receiveMail, this.donateDialog.value.couponNumber)
      .pipe(take(1), catchError(
        error => {
          this.FormExceptionOccurEv.emit('Đã có lỗi xảy ra trong quá trình thực hiện yêu cầu donate!');
          return throwError(error);
        }
      ))
      .subscribe(() => {
        this.FormSubmittedEv.emit(true);
        this.activeModal.close('Close click');
    });
  }

}
