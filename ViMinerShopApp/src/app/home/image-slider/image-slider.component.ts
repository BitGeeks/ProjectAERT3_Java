import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { NoticeService } from 'src/app/services/notice.service';
import { HPNotice, SlideImage } from 'src/app/store/model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
  providers: [NgbCarouselConfig]
})
export class ImageSliderComponent implements OnInit {
  slideImage: Array<SlideImage>;
  currentSlide = 0;
  slideSlideIt = null;
  noticetext: Array<HPNotice>;

  currentSlideOffset = 100;

  constructor(config: NgbCarouselConfig,
              private noticeService: NoticeService,
              private router: Router,
              private route: ActivatedRoute) {
    config.interval = 10000;
    config.wrap = true;
    config.keyboard = false;
  }

  ngOnInit() {
    this.getNoticeImage();
    this.onUserAction();
    this.getNoticeText();
  }

  ngOnDestroy() {
    if (this.slideSlideIt) {
      clearInterval(this.slideSlideIt);
    }
  }

  getNoticeImage() {
    this.noticeService.getSlideImage().subscribe(data => {
      this.slideImage = data;
    });
  }

  getNoticeText() {
    this.noticeService.getHPNotice().subscribe(data => {
      this.noticetext = data;
    });
  }

  onUserClickSlideNode(index: number) {
    this.onUserAction();
    this.currentSlide = index;
  }

  onSlidePrevClick() {
    this.onUserAction();
    if (this.currentSlide === 0) {
      this.currentSlide = this.slideImage.length - 1;
    } else { this.currentSlide -= 1; }
  }

  onSlideNextClick() {
    this.onUserAction();
    if (this.currentSlide === this.slideImage.length - 1) {
      this.currentSlide = 0;
    } else { this.currentSlide += 1; }
  }

  onUserClickToJump(jumpPath) {
    this.router.navigate([`/${jumpPath}`], { relativeTo: this.route });
  }

  onUserAction() {
    if (this.slideSlideIt) {
      clearInterval(this.slideSlideIt);
    }
    this.slideSlideIt = setInterval(() =>
      {
        if (!this.slideImage) { return; }
        if (this.currentSlide < this.slideImage.length - 1) {
          this.currentSlide++;
        }
        else { this.currentSlide = 0; }
      }, 3000
    );
  }

}
