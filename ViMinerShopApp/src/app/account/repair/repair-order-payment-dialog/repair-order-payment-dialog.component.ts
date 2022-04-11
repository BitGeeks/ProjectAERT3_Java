import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import {
    IPayPalConfig,
    ICreateOrderRequest
} from 'ngx-paypal';
import { RepairService } from 'src/app/services/repair.service';

@Component({
  selector: 'app-repair-order-payment-dialog',
  templateUrl: './repair-order-payment-dialog.component.html',
  styleUrls: ['./repair-order-payment-dialog.component.scss']
})
export class RepairOrderPaymentDialogComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;

  isMaxMinesAuthenticate = false;
  paypalPayment = false;
  paymentDesc: string;

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
    private notifierService: NotifierService,
    private repairService: RepairService,
    private translatePipe: TranslatePipe
  ) { }

  ngOnInit(): void {
    this.onProviderChange({
      target: {
        value: this.initialState.providers[this.initialState.provider].id
      }
    });
  }

  onProviderChange(ev) {
    this.initConfig();
    const { value } = ev.target;
    this.isMaxMinesAuthenticate = false;
    this.paypalPayment = false;
    const selectedPayment = this.initialState.providers.filter(pl => pl.id === parseInt(value))[0];
    switch (selectedPayment.name.toLowerCase()) {
      case 'maxmines payment':
        this.isMaxMinesAuthenticate = true;
        break;
      case 'paypal':
        this.paypalPayment = true;
        break;
      default:
        this.paymentDesc = selectedPayment.desc;
        break;
    }
  }

  // @ts-nocheck
  private initConfig() {
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest> {
          intent: 'CAPTURE',
          purchase_units: [{
              amount: {
                  currency_code: 'USD',
                  value: this.initialState.price.toString(),
                  breakdown: {
                      item_total: {
                          currency_code: 'USD',
                          value: this.initialState.price.toString()
                      }
                  }
              }
          }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onClientAuthorization: (data) => {
        this.repairService.onRepairPaypalOrderSuccess(data.id, data.status, data.payer.email_address, data.payer.payer_id, this.initialState.repair_id)
        .pipe().subscribe(() => {
          this.notifierService.notify('success', this.translatePipe.transform('Thanh toán đơn sửa chữa thành công'));
          this.FormSubmittedEv.emit(true);
          this.activeModal.close('Close click');
        });
      },
      onCancel: (data, actions) => {
        this.notifierService.notify('success', this.translatePipe.transform('Hủy thanh toán thành công'));
      },
      onError: err => {
        this.notifierService.notify('error', this.translatePipe.transform('Đã có lỗi xảy ra trong quá trình thanh toán!'));
      }
    };
  }

  onUserClickClose() {
    this.activeModal.close('Close click');
  }
}
