import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-algorithm',
  templateUrl: './add-algorithm.component.html',
  styleUrls: ['./add-algorithm.component.scss']
})
export class AddAlgorithmComponent implements OnInit {
  addAlgorithmForm: FormGroup;

  constructor(
    private adminService: AdminService,
    private notifierService: NotifierService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addAlgorithmForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      desc: new FormControl(null, []),
      slug: new FormControl(null, [Validators.required])
    });
  }

  FormSubmittedEv() {
    if (!this.addAlgorithmForm.valid) { return; }
    const { name, desc, slug } = this.addAlgorithmForm.value;
    this.adminService.addAlgorithm(name, desc, slug)
      .pipe(take(1), catchError(
        error => {
          return throwError(error);
        }
      ))
      .subscribe(() => {
        this.router.navigate([`/admin/algorithms/manage`]);
        this.notifierService.notify('success', 'Thêm thuật toán mới thành công!');
    });
  }

}
