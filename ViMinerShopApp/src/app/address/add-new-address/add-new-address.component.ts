import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '@ngx-translate/core';
import { Subscription, throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import { getNationList } from '../nation';

@Component({
  selector: 'app-add-new-address',
  templateUrl: './add-new-address.component.html',
  styleUrls: ['./add-new-address.component.scss']
})
export class AddNewAddressComponent implements OnInit {
  newAddress: FormGroup;

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
    this.newAddress = new FormGroup({
      address: new FormControl(null, [Validators.required]),
      streetName: new FormControl(null, [Validators.required]),
      cityName: new FormControl(null, [Validators.required]),
      postalCode: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{5}')]),
      countryCode: new FormControl(null, [Validators.required]),
      telephone: new FormControl(null, [Validators.required, Validators.pattern('[- +()0-9]+')]),
      mobile: new FormControl(null, [Validators.required, Validators.pattern('[- +()0-9]+')])
    });
  }

  onUserClickCloseDialog() {
    // this.FormCloseEv.emit(true);
    this.activeModal.close('Close click');
  }

  onAddressSubmitted() {
      const { address, streetName, cityName, postalCode, countryCode, telephone, mobile } = this.newAddress.value;
      this.accountService.addUserAddress(address, streetName, cityName, postalCode, countryCode, telephone, mobile)
        .pipe(take(1), catchError(
          error => {
            this.FormExceptionOccurEv.emit(this.translatePipe.transform('Đã có lỗi xảy ra trong quá trình thêm mới địa chỉ'));
            return throwError(error);
          }
        ))
        .subscribe(data => {
          this.FormSubmittedEv.emit(true);
          this.activeModal.close('Close click');
      });
  }

}

class NationalPair {
  name: string;
  code: string;
}
