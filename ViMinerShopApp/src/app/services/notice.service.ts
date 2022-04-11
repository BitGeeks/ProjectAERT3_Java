import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config/local';
import { HPNotice, SlideImage } from '../store/model';


@Injectable()
export class NoticeService {

  hpNotice = `${config.apiUrl}/api/hpnotices`;
  slideUrl = `${config.apiUrl}/api/slideimages`;

  constructor(private httpClient: HttpClient) {
  }

  getHPNotice() {
    return this.httpClient.get<Array<HPNotice>>(`${this.hpNotice}/all`);
  }

  getSlideImage() {
    return this.httpClient.get<Array<SlideImage>>(`${this.slideUrl}/all`);
  }
}
