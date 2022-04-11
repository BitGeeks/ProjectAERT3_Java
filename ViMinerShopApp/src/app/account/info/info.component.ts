import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import { Router } from '@angular/router';
import { catchError, take } from 'rxjs/operators';
import * as AuthActions from '../../store/auth/auth.actions';
import { Observable, Subscription, throwError } from 'rxjs';
import { Orders, User, UserPoint } from 'src/app/store/model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderState } from 'src/app/store/order/order.reducer';
import { OrderService } from 'src/app/services/order.service';
import { RepairService } from 'src/app/services/repair.service';
import { Title } from '@angular/platform-browser';
import { NotifierService } from 'angular-notifier';
import { ImageSnippet } from 'src/app/store/ImageSnippet';
import { ImageService } from 'src/app/services/image-service.service';
import { TranslatePipe } from '@ngx-translate/core';
import { BrowseState } from 'src/app/store/browse/browse.reducer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AvatarUploadDialogComponent } from './avatar-upload-dialog/avatar-upload-dialog.component';

@Component({
  selector: 'app-information',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  userData: User;
  isInfoChanging = false;
  userInfo: FormGroup;

  selectedFile: ImageSnippet;

  orderData: Array<Orders>;
  unpaidOrderNum = 0;
  uncollectedTicketNum = 0;
  unshippedOrderNum = 0;
  unpaidRepairOrder = 0;

  browseState: Observable<BrowseState>;
  browserSubscription: Subscription;
  currency = 'USD';
  currencyRate = 1;

  couponCount = 0;
  userPoint: UserPoint;

  profileImage = null;

  constructor(
    private accountService: AccountService,
    private store: Store<fromApp.AppState>,
    private router: Router,
    private orderService: OrderService,
    private repairService: RepairService,
    private titleMeta: Title,
    private notifierService: NotifierService,
    private imageService: ImageService,
    private translatePipe: TranslatePipe,
    private modalService: NgbModal
  )
  {
  }

  ngOnInit() {
    this.titleMeta.setTitle(this.translatePipe.transform('Thông tin tài khoản'));
    this.browseState = this.store.select('browse');
    this.orderService.getAllOrders(0)
      .pipe(take(1), catchError(
        error => {
          this.notifierService.notify('success', error);
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.unpaidOrderNum = data.filter(d => d.paymentDetail.status === 0).length;
        this.unshippedOrderNum = data.filter(d => d.paymentDetail.status === 2).length;
      });
    this.userInfo = new FormGroup({
      fname: new FormControl(null, [Validators.required]),
      lname: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      telephone: new FormControl(null, [Validators.required])
    });
    this.getUserInfo();
    this.getRepairTicket();
    this.getRepairOrder();
    this.browserSubscription = this.browseState.subscribe(data => {
      this.currency = data.currentCurrency;
      if (JSON.stringify(data.exchangeRates) !== '{}') {
        this.currencyRate = data.exchangeRates[data.currentCurrency];
      }
    });
    this.getUserAvailableCoupon();
    this.getUserStatPoint();
  }

  onUserClickChangeAvatar() {
    if (!this.isInfoChanging) { return; }
    document.getElementById('processFileInput').click();
  }

  processFile(imageInput: any) {
    const UploadAvatar = this.modalService.open(AvatarUploadDialogComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    UploadAvatar.componentInstance.AvatarCroppedEv.subscribe($e => this.AvatarCroppedEv($e));
    UploadAvatar.componentInstance.ExceptionEv.subscribe($e => this.onAvatarUploadException($e));
    UploadAvatar.componentInstance.imageChangedEvent = imageInput;

    /*const file: File = imageInput.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      var base64 = /,(.+)/.exec(event.target.result)[1];

      this.imageService.uploadImage(base64, file.name).subscribe(
        (res) => {
          this.notifierService.notify('success', this.translatePipe.transform('Tải lên thành công!'));
          this.profileImage = 'https://cdn.notevn.com/' + res.file_name + '' + res.type;
          this.userData.userImage = 'https://cdn.notevn.com/' + res.file_name + '' + res.type;
        },
        (err) => {
          this.profileImage = null;
          this.notifierService.notify('error', this.translatePipe.transform('Tải lên thất bại!'));
        }
      );
    });

    reader.readAsDataURL(file);*/
  }

  onAvatarUploadException(msg: string) {
    this.notifierService.notify('error', msg);
  }

  AvatarCroppedEv(base64: string) {
    this.imageService.uploadImage(base64, 'vms_avatar').subscribe(
      (res) => {
        this.notifierService.notify('success', this.translatePipe.transform('Tải lên thành công!'));
        this.profileImage = 'https://cdn.notevn.com/' + res.file_name + '' + res.type;
        this.userData.userImage = 'https://cdn.notevn.com/' + res.file_name + '' + res.type;
      },
      (err) => {
        this.profileImage = null;
        this.notifierService.notify('error', this.translatePipe.transform('Tải lên thất bại!'));
      }
    );
  }

  getUserAvailableCoupon() {
    this.orderService.getUserAvailableCoupon(-1)
      .pipe(take(1), catchError(
        error => {
          this.notifierService.notify('success', error);
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.couponCount = data.length;
    });
  }

  getRepairTicket() {
    this.repairService.getRepairOrderCount(0)
      .pipe()
      .subscribe((data: number) => {
        this.uncollectedTicketNum = data;
      });
  }

  getRepairOrder() {
    this.repairService.getRepairOrdersCount(0)
    .pipe()
    .subscribe((data: number) => {
      this.unpaidRepairOrder = data;
    });
  }

  onUserClickSetInformation() {
    if (!this.isInfoChanging) {
      this.userInfo.patchValue({
        fname: this.userData.firstName,
        lname: this.userData.lastName,
        username: this.userData.username,
        password: '',
        telephone: this.userData.telephone
      });
    }
    this.isInfoChanging = !this.isInfoChanging;
  }

  onUserClickSaveInformation() {
    this.accountService.updateUser({
      FirstName: this.userInfo.value.fname,
      LastName: this.userInfo.value.lname,
      Username: this.userInfo.value.username,
      Telephone: this.userInfo.value.telephone,
      Password: this.userInfo.value.password,
      UserImage: this.profileImage
    }).pipe(take(1), catchError(error => {
      this.store.dispatch(new AuthActions.SignOut());
      this.router.navigate(['/']);
      this.notifierService.notify('success', error);
      return throwError(error);
    }
    )).subscribe(data => {
      this.notifierService.notify('success', this.translatePipe.transform('Cập nhật thông tin người dùng thành công'));
      this.onUserClickSetInformation();
      this.userData = data;
    });
  }

  onUserClickSecurityBtn() {
    this.router.navigate(['/account/records']);
  }

  getUserInfo() {
    this.accountService.getUser().pipe(take(1), catchError(error => {
      this.store.dispatch(new AuthActions.SignOut());
      this.router.navigate(['/']);
      this.notifierService.notify('success', error);
      return throwError(error);
    }
    )).subscribe(data => {
      this.userData = data;
    });
  }

  getUserStatPoint() {
    this.accountService.getUserPoint().pipe(take(1), catchError(error => {
      this.store.dispatch(new AuthActions.SignOut());
      this.router.navigate(['/']);
      this.notifierService.notify('success', error);
      return throwError(error);
    }
    )).subscribe(data => {
      this.userPoint = data;
    });
  }

  ngOnDestroy(): void {
    if (this.browserSubscription) {
      this.browserSubscription.unsubscribe();
    }
  }
}
