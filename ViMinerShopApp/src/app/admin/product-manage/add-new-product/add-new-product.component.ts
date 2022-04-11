import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotifierService } from 'angular-notifier';
import { Observable, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import { ImageService } from 'src/app/services/image-service.service';
import { BrowseState } from 'src/app/store/browse/browse.reducer';
import { ImageSnippet } from 'src/app/store/ImageSnippet';
import { Algorithm, processImage, productInventory } from 'src/app/store/model';
import * as fromApp from '../../../store/app.reducers';
import * as BrowseActions from '../../../store/browse/browse.actions';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {
  addProductForm: FormGroup;
  browseState: Observable<BrowseState>;
  selectedCategory = 0;
  selectedAlgorithm = 0;
  dragAreaClass: string;

  algorithmList: Array<Algorithm>;

  productImages: Array<processImage> = [];
  currentNode = 0;
  isUploading = false;
  selectedFile: ImageSnippet;

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

  constructor(
    private store: Store<fromApp.AppState>,
    private adminService: AdminService,
    private notifierService: NotifierService,
    private imageService: ImageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.browseState = this.store.select('browse');
    this.addProductForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      desc: new FormControl(null, []),
      noteDesc: new FormControl(null, []),
      detailDesc: new FormControl(null, []),
      paymentDesc: new FormControl(null, []),
      warrantyDesc: new FormControl(null, []),
      sku: new FormControl(null, [Validators.required]),
      category_id: new FormControl(null, [Validators.required]),
      algorithm_id: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      pricePromotion: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required]),
      flag: new FormControl(null, []),
      hps: new FormControl(null, [Validators.required]),
      weight: new FormControl(null, [Validators.required]),
      shippingInfo: new FormControl(null, [])
    });

    this.browseState.pipe(take(1)).subscribe(data => {
      if (data.categories.length === 0) {
        this.store.dispatch(new BrowseActions.FetchCategory());
      }
      if (data.categories.length !== 0) {
        this.selectedCategory = data.categories[0].id;
      }
    });

    this.getAlgorithmList();
  }

  getAlgorithmList() {
    this.adminService.getAlgorithmList(-1)
      .pipe(take(1), catchError(
        error => {
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.algorithmList = data;
    });
  }

  FormSubmittedEv() {
    if (!this.addProductForm.valid) { return; }
    const { name, desc, noteDesc, detailDesc, paymentDesc, warrantyDesc, sku, category_id, algorithm_id, price, pricePromotion, quantity, flag, hps, weight, shippingInfo } = this.addProductForm.value;
    const productImage = this.productImages;
    this.adminService.addProduct(
      name,
      desc,
      noteDesc,
      detailDesc,
      paymentDesc,
      warrantyDesc,
      sku,
      category_id,
      algorithm_id,
      price,
      productImage,
      pricePromotion,
      quantity, flag, hps, weight, shippingInfo
    )
      .pipe(take(1), catchError(
        error => {
          return throwError(error);
        }
      ))
      .subscribe(data => {
        this.router.navigate([`/admin/products/manage`]);
        this.notifierService.notify('success', 'Thêm sản phẩm mới thành công!');
    });
  }

  removeItemPhoto(value: number) {
    this.productImages = this.productImages.filter((data) => data !== this.productImages[value]);
    if (this.currentNode === value) {
      if (value >= 1) {
        this.currentNode = this.currentNode - 1;
      }
    } else if (value < this.currentNode) {
      this.currentNode = this.currentNode - 1;
    }
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
          this.productImages.push({
            imageUrl: 'https://cdn.notevn.com/' + res.file_name + '' + res.type,
            alt_Name: file.name
          });
        },
        (err) => {
          this.isUploading = false;
          this.notifierService.notify('error', 'Tải lên thất bại!');
        }
      );
    });

    reader.readAsDataURL(file);
  }

}
