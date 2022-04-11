import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-arepair-ticket-details',
  templateUrl: './arepair-ticket-details.component.html',
  styleUrls: ['./arepair-ticket-details.component.scss']
})
export class ARepairTicketDetailsComponent implements OnInit {
  editTicketStatus: FormGroup;

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
    private notifierService: NotifierService
    ) { }

  ngOnInit(): void {
    this.editTicketStatus = new FormGroup({
      id: new FormControl(null, Validators.required),
      ticketStatus: new FormControl(null, [Validators.required])
    });
    this.editTicketStatus.patchValue({
      id: this.initialState.id,
      ticketStatus: this.initialState.status
    });
  }

  onEditSubmitted() {
    if (!this.editTicketStatus.valid) { return; }
    const { id, ticketStatus } = this.editTicketStatus.value;
    this.adminService.editTicketStatus(id, ticketStatus)
      .pipe(take(1), catchError(
        error => {
          this.FormExceptionOccurEv.emit(error);
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.FormSubmittedEv.emit(true);
        this.notifierService.notify('success', 'Cập nhật trạng thái vé thành công!');
        this.activeModal.close('Close click');
    });
  }

  onUserClickClose() {
    this.activeModal.close('Close click');
  }

}
