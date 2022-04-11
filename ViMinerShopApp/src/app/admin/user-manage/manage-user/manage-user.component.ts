import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import { User } from 'src/app/store/model';
import { EditUserPermissionComponent } from '../edit-user-permission/edit-user-permission.component';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  userList: Array<User>;

  page = 0;
  pageSize = 3;
  pageLimit = 0;
  disablePrevPageBtn = true;
  disableNextPageBtn = true;

  constructor(
    private adminService: AdminService,
    private notifierService: NotifierService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.adminService.getAllUserCount()
      .pipe(take(1), catchError(
        error => {
          this.notifierService.notify('error', 'Đã có lỗi xảy ra trong quá trình thao tác dữ liệu!');
          return throwError(error);
        }
      ))
      .subscribe((data: number) => {
          this.pageSize = this.adminService.getPageSize();
          this.pageLimit = Math.ceil(data / this.adminService.getPageSize());
          if (this.pageLimit > 1) { this.disableNextPageBtn = false; }
          this.getUserList();
      });
  }

  getUserList() {
    this.userList = [];
    this.adminService.getUserList(this.page)
      .pipe(take(1), catchError(
        error => {
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.userList = data;
    });
  }

  editUser(user: User) {
    const EditUser = this.modalService.open(EditUserPermissionComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    EditUser.componentInstance.FormSubmittedEv.subscribe($e => this.getUserList());
    EditUser.componentInstance.FormExceptionOccurEv.subscribe($e => this.onException($e));
    EditUser.componentInstance.initialState = user;
  }

  userClickPreviousPage() {
    if (this.page > 0) {
      this.page--;
      this.getUserList();
    }
  }

  userClickNextPage() {
    if (this.userList.length === 0) { return; }
    this.page ++;
    this.getUserList();
  }

  onException(ev: string) {
    this.notifierService.notify('error', ev);
  }

}
