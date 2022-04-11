import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-new-inventory',
  templateUrl: './add-new-inventory.component.html',
  styleUrls: ['./add-new-inventory.component.scss']
})
export class AddNewInventoryComponent implements OnInit {
  addInventoryForm: FormGroup;

  constructor(
    private adminService: AdminService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.addInventoryForm = new FormGroup({
      quantity: new FormControl(null, [Validators.required]),
      flag: new FormControl(null, []),
      hps: new FormControl(null, []),
      weight: new FormControl(null, []),
      shippingInfo: new FormControl(null, [])
    });
  }

  FormSubmittedEv() {
    if (!this.addInventoryForm.valid) { return; }
    const { quantity, flag, hps, weight, shippingInfo } = this.addInventoryForm.value;
    this.adminService.addInventory(quantity, flag, hps, weight, shippingInfo)
      .pipe(take(1), catchError(
        error => {
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.notifierService.notify('success', 'Thêm kho hàng mới thành công!');
    });
  }

}
