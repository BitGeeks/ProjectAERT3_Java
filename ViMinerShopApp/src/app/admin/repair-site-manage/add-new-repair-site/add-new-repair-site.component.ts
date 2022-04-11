import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-new-repair-site',
  templateUrl: './add-new-repair-site.component.html',
  styleUrls: ['./add-new-repair-site.component.scss']
})
export class AddNewRepairSiteComponent implements OnInit {
  addRepairSite: FormGroup;

  constructor(
    private adminService: AdminService,
    private notifierService: NotifierService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addRepairSite = new FormGroup({
      code: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      extraInfo: new FormControl(null, []),
      note: new FormControl(null, []),
      location: new FormControl(null, [Validators.required])
    });
  }

  FormSubmittedEv() {
    if (!this.addRepairSite.valid) { return; }
    const { code, name, extraInfo, note, location } = this.addRepairSite.value;
    this.adminService.addRepairSite(code, name, extraInfo, note, location)
      .pipe(take(1), catchError(
        error => {
          return throwError(error);
        }
      ))
      .subscribe(() => {
        this.router.navigate([`/admin/repairSites/manage`]);
        this.notifierService.notify('success', 'Thêm đại lý sửa chữa mới thành công!');
    });
  }

}
