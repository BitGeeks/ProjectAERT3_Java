import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '@ngx-translate/core';
import { Subscription, throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import { getNationList } from '../nation';

@Component({
  selector: 'app-edit-new-address',
  templateUrl: './edit-new-address.component.html',
  styleUrls: ['./edit-new-address.component.scss']
})
export class EditNewAddressComponent implements OnInit {
  editAddress: FormGroup;

  @Input()
  public initialState: { [key: string]: any };

  @Output()
  public FormSubmittedEv = new EventEmitter<boolean>();

  @Output()
  public FormExceptionOccurEv = new EventEmitter<string>();

  @Output()
  public FormCloseEv = new EventEmitter<boolean>();

  nationListSelector = getNationList();

  constructor(
    private accountService: AccountService,
    public activeModal: NgbActiveModal,
    private translatePipe: TranslatePipe
  ) { }

  ngOnInit(): void {
    this.editAddress = new FormGroup({
      id: new FormControl(null, []),
      address: new FormControl(null, [Validators.required]),
      streetName: new FormControl(null, [Validators.required]),
      cityName: new FormControl(null, [Validators.required]),
      postalCode: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{5}')]),
      countryCode: new FormControl(null, [Validators.required]),
      telephone: new FormControl(null, [Validators.required, Validators.pattern('[- +()0-9]+')]),
      mobile: new FormControl(null, [Validators.required, Validators.pattern('[- +()0-9]+')])
    });
    this.editAddress.patchValue({
      id: this.initialState.id,
      address: this.initialState.address,
      streetName: this.initialState.street_name,
      cityName: this.initialState.city,
      postalCode: this.initialState.postal_code,
      countryCode: this.initialState.country,
      telephone: this.initialState.telephone,
      mobile: this.initialState.mobile
    });
  }

  onEditSubmitted() {
    const { id, address, streetName, cityName, postalCode, countryCode, telephone, mobile } = this.editAddress.value;
    this.accountService.updateUserAddress(id, address, streetName, cityName, postalCode, countryCode, telephone, mobile)
      .pipe(take(1), catchError(
        error => {
          this.FormExceptionOccurEv.emit(this.translatePipe.transform('Đã có lỗi xảy ra trong quá trình cập nhật địa chỉ!'));
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.FormSubmittedEv.emit(true);
        this.activeModal.close('Close click');
    });
  }

  onUserClickClose() {
    this.FormCloseEv.emit(true);
    this.activeModal.close('Close click');
  }

}
