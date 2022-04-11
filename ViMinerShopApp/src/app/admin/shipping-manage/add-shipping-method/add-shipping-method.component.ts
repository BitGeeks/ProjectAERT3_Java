import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-shipping-method',
  templateUrl: './add-shipping-method.component.html',
  styleUrls: ['./add-shipping-method.component.scss']
})
export class AddShippingMethodComponent implements OnInit {
  addShippingForm: FormGroup;

  constructor(
    private adminService: AdminService,
    private notifierService: NotifierService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addShippingForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      shortName: new FormControl(null, [Validators.required]),
      repairFlag: new FormControl(null, []),
      salesFlag: new FormControl(null, []),
      supportFreeShip: new FormControl(null, []),
      erpCode: new FormControl(null, [Validators.required]),
      logoUrl: new FormControl(null, []),
      avgfeeperkm: new FormControl(null, [Validators.required])
    });
  }

  FormSubmittedEv() {
    if (!this.addShippingForm.valid) { return; }
    const { name, shortName, repairFlag, salesFlag, supportFreeShip, erpCode, logoUrl, avgfeeperkm } = this.addShippingForm.value;
    this.adminService.addShippingMethod(name, shortName, repairFlag, salesFlag, supportFreeShip, erpCode, logoUrl, avgfeeperkm)
      .pipe(take(1), catchError(
        error => {
          return throwError(error);
        }
      ))
      .subscribe(() => {
        this.router.navigate([`/admin/shipping/manage`]);
        this.notifierService.notify('success', 'Thêm đơn vị vận chuyển mới thành công!');
    });
  }

}
