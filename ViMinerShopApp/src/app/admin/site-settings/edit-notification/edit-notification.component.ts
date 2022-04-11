import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { AdminService } from 'src/app/services/admin.service';
import { NoticeService } from 'src/app/services/notice.service';

@Component({
  selector: 'app-edit-notification',
  templateUrl: './edit-notification.component.html',
  styleUrls: ['./edit-notification.component.scss']
})
export class EditNotificationComponent implements OnInit {
  editNotification: FormGroup;

  constructor(
    private noticeService: NoticeService,
    private adminService: AdminService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.editNotification = new FormGroup({
      notify1: new FormControl(null, []),
      notify2: new FormControl(null, []),
      notify3: new FormControl(null, [])
    });
    this.patchValue();
  }

  patchValue() {
    this.noticeService.getHPNotice().subscribe(data => {
      this.editNotification.patchValue({
        notify1: data[0].content,
        notify2: data[1].content,
        notify3: data[2].content
      });
    });
  }

  FormSubmittedEv() {
    if (!this.editNotification.valid) { return; }
    const { notify1, notify2, notify3 } = this.editNotification.value;
    this.adminService.setHPNotice(
      notify1, notify2, notify3
    ).subscribe(() => {
      this.patchValue();
      this.notifierService.notify('success', 'Lưu thông báo thành công!');
    });
  }

}
