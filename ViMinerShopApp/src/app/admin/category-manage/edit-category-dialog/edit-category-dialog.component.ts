import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.scss']
})
export class EditCategoryDialogComponent implements OnInit {
  editCategory: FormGroup;

  @Input()
  public initialState: { [key: string]: any };

  @Output()
  public FormSubmittedEv = new EventEmitter<boolean>();

  @Output()
  public FormExceptionOccurEv = new EventEmitter<string>();

  @Output()
  public FormCloseEv = new EventEmitter<boolean>();

  constructor(
    private adminService: AdminService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.editCategory = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      desc: new FormControl(null, []),
      image: new FormControl(null, []),
      slug: new FormControl(null, [Validators.required])
    });
    this.editCategory.patchValue({
      id: this.initialState.id,
      name: this.initialState.name,
      desc: this.initialState.desc,
      image: this.initialState.image,
      slug: this.initialState.slug
    });
  }

  onEditSubmitted() {
    if (!this.editCategory.valid) { return; }
    const { id, name, desc, image, slug } = this.editCategory.value;
    this.adminService.updateCategory(id, name, desc, image, slug).pipe(take(1), catchError(
      error => {
        this.FormExceptionOccurEv.emit(error);
        return throwError(error);
      }
    ))
    .subscribe(data => {
      this.FormSubmittedEv.emit(true);
      this.onUserClickClose();
    });
  }

  onUserClickClose() {
    this.FormCloseEv.emit(true);
    this.activeModal.close('Close click');
  }

}
