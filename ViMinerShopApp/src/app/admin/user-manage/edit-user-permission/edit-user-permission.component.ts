import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import { RoleVar } from 'src/app/store/model';

@Component({
  selector: 'app-edit-user-permission',
  templateUrl: './edit-user-permission.component.html',
  styleUrls: ['./edit-user-permission.component.scss']
})
export class EditUserPermissionComponent implements OnInit {
  editUserPermission: FormGroup;

  roleList: Array<RoleVar>;

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
    private adminService: AdminService,
    private notifierService: NotifierService,
  ) { }

  ngOnInit(): void {
    this.getRoleList();
    this.editUserPermission = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      permission: new FormControl(null, [Validators.required])
    });
    this.editUserPermission.patchValue({
      id: this.initialState.id,
      permission: this.initialState.roleVar_Id
    });
  }

  onEditSubmitted() {
    if (!this.editUserPermission.valid) { return; }
    const { id, permission } = this.editUserPermission.value;
    this.adminService.setUserPermission(id, permission)
      .pipe(take(1), catchError(
        error => {
          this.FormExceptionOccurEv.emit(error);
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.FormSubmittedEv.emit(true);
        this.activeModal.close('Close click');
    });
  }

  getRoleList() {
    this.adminService.getRoleList()
      .pipe(take(1), catchError(
        error => {
          this.FormExceptionOccurEv.emit(error);
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.roleList = data;
    });
  }

  onUserClickClose() {
    this.FormCloseEv.emit(true);
    this.activeModal.close('Close click');
  }

}
