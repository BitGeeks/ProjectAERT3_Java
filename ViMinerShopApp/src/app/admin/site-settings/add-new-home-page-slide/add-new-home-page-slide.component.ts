import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import { ImageService } from 'src/app/services/image-service.service';
import { ImageSnippet } from 'src/app/store/ImageSnippet';

@Component({
  selector: 'app-add-new-home-page-slide',
  templateUrl: './add-new-home-page-slide.component.html',
  styleUrls: ['./add-new-home-page-slide.component.scss']
})
export class AddNewHomePageSlideComponent implements OnInit {
  addNewHomepageSlide: FormGroup;
  selectedFile: ImageSnippet;
  dragAreaClass: string;

  isUploading = false;
  imageUrl = false;

  constructor(
    private adminService: AdminService,
    private notifierService: NotifierService,
    private imageService: ImageService
  ) { }

  @HostListener('dragover', ['$event']) onDragOver(event: any) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }
  @HostListener('dragenter', ['$event']) onDragEnter(event: any) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }
  @HostListener('dragend', ['$event']) onDragEnd(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }
  @HostListener('dragleave', ['$event']) onDragLeave(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }
  @HostListener('drop', ['$event']) onDrop(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      const files: FileList = event.dataTransfer.files;
      this.processFile({ files });
    }
  }

  ngOnInit(): void {
    this.addNewHomepageSlide = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      fillColor: new FormControl(null, [Validators.required]),
      imgUrl: new FormControl(null, [Validators.required]),
      jumpTo: new FormControl(null, [Validators.required])
    });
  }

  FormSubmittedEv() {
    if (!this.addNewHomepageSlide.valid) { return; }
    const { name, fillColor, imgUrl, jumpTo } = this.addNewHomepageSlide.value;
    this.adminService.addNewSlideImage(name, fillColor, imgUrl, jumpTo)
      .pipe(take(1), catchError(
        error => {
          this.notifierService.notify('error', error);
          return throwError(error);
        }
      ))
      .subscribe(() => {
        this.notifierService.notify('success', 'Thêm mới slide thành công');
    });
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    this.isUploading = true;

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      const base64 = /,(.+)/.exec(event.target.result)[1];

      this.imageService.uploadImage(base64, file.name).subscribe(
        (res) => {
          this.isUploading = false;
          this.notifierService.notify('success', 'Tải lên thành công!');
          this.addNewHomepageSlide.patchValue({
            imgUrl: 'https://cdn.notevn.com/' + res.file_name + '' + res.type
          });
          this.imageUrl = true;
        },
        (err) => {
          this.isUploading = false;
          this.notifierService.notify('error', 'Tải lên thất bại!');
          this.imageUrl = false;
        }
      );
    });

    reader.readAsDataURL(file);
  }

}
