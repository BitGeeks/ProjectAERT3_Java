import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HTTP_OPTIONS } from '../configs/header.config';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  cloudApi = `https://notevn.com/file/vicloud`;

  constructor(
    private httpClient: HttpClient
  ) { }

  public uploadImage(image: string, ImageName: string): Observable<any> {
    const formData = new FormData();

    formData.append('base64', image);
    formData.append('ImageName', ImageName);

    return this.httpClient.post(`${this.cloudApi}`, formData);
  }
}
