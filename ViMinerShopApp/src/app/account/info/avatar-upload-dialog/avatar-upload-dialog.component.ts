import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '@ngx-translate/core';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-avatar-upload-dialog',
  templateUrl: './avatar-upload-dialog.component.html',
  styleUrls: ['./avatar-upload-dialog.component.scss']
})
export class AvatarUploadDialogComponent implements OnInit {
  @Input()
  public imageChangedEvent: any = '';

  @Output()
  public AvatarCroppedEv = new EventEmitter<string>();

  @Output()
  public ExceptionEv = new EventEmitter<string>();

  croppedImage: any = '';

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    // this.AvatarCroppedEv.emit(event.base64);
  }

  imageLoaded(image: LoadedImage) {
      // show cropper
  }

  cropperReady() {
      // cropper ready
  }

  loadImageFailed() {
    this.ExceptionEv.emit(this.translatePipe.transform('Đã có lỗi xảy ra trong quá trình thay đổi hình ảnh đại diện'));
  }

  constructor(
    private translatePipe: TranslatePipe,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  onAvatarSubmit() {
    this.AvatarCroppedEv.emit(this.croppedImage);
    this.onUserClickCloseDialog();
  }

  onUserClickCloseDialog() {
    this.activeModal.close('Close click');
  }

}
