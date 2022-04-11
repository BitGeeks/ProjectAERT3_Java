import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import { SlideImage } from 'src/app/store/model';
import { EditHomePageSlideComponent } from '../edit-home-page-slide/edit-home-page-slide.component';

@Component({
  selector: 'app-home-page-slide',
  templateUrl: './home-page-slide.component.html',
  styleUrls: ['./home-page-slide.component.scss']
})
export class HomePageSlideComponent implements OnInit {
  homePageSlide: Array<SlideImage>;

  constructor(
    private adminService: AdminService,
    private modalService: NgbModal,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.getSlideImages();
  }

  editHomePageSlide(slide: SlideImage) {
    const EditSlide = this.modalService.open(EditHomePageSlideComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    EditSlide.componentInstance.FormSubmittedEv.subscribe($e => this.getSlideImages());
    EditSlide.componentInstance.FormExceptionOccurEv.subscribe($e => this.onException($e));
    EditSlide.componentInstance.initialState = slide;
  }

  removeSlide(slide: SlideImage) {
    this.adminService.removeSlideImages(slide.id)
      .pipe(take(1), catchError(
        error => {
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.homePageSlide = data;
    });
  }

  getSlideImages() {
    this.adminService.getSlideImages()
      .pipe(take(1), catchError(
        error => {
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.homePageSlide = data;
    });
  }

  onException(ev: string) {
    this.notifierService.notify('error', ev);
  }

}
