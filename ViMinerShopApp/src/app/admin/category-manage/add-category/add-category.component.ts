import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  addCategoryForm: FormGroup;

  constructor(
    private adminService: AdminService,
    private notifierService: NotifierService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addCategoryForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      desc: new FormControl(null, []),
      image: new FormControl(null, []),
      slug: new FormControl(null, [Validators.required])
    });
  }

  FormSubmittedEv() {
    if (!this.addCategoryForm.valid) { return; }
    const { name, desc, image, slug } = this.addCategoryForm.value;
    this.adminService.addCategory(name, desc, image, slug)
      .pipe(take(1), catchError(
        error => {
          return throwError(error);
        }
      ))
      .subscribe(() => {
        this.router.navigate([`/admin/categories/manage`]);
        this.notifierService.notify('success', 'Thêm danh mục mới thành công!');
    });
  }

}
