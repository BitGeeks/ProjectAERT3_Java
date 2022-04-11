import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-algorithm-dialog',
  templateUrl: './edit-algorithm-dialog.component.html',
  styleUrls: ['./edit-algorithm-dialog.component.scss']
})
export class EditAlgorithmDialogComponent implements OnInit {
  editAlgorithmForm: FormGroup;

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
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.editAlgorithmForm = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      desc: new FormControl(null, []),
      slug: new FormControl(null, [Validators.required])
    });
    this.editAlgorithmForm.patchValue({
      id: this.initialState.id,
      name: this.initialState.name,
      desc: this.initialState.desc,
      slug: this.initialState.slug
    });
  }

  onEditSubmitted() {
    if (!this.editAlgorithmForm.valid) { return; }
    const { id, name, desc, slug } = this.editAlgorithmForm.value;
    this.adminService.editAlgorithm(id, name, desc, slug)
      .pipe(take(1), catchError(
        error => {
          this.FormExceptionOccurEv.emit(error);
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.FormSubmittedEv.emit(true);
        this.notifierService.notify('success', 'Sửa thuật toán thành công!');
        this.activeModal.close('Close click');
    });
  }

  onUserClickClose() {
    this.FormCloseEv.emit(true);
    this.activeModal.close('Close click');
  }

}
