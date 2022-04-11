import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as fromApp from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import { Observable, Subscription, throwError } from 'rxjs';
import { OrderState } from 'src/app/store/order/order.reducer';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { catchError, take } from 'rxjs/operators';
import * as CartActions from '../../store/cart/cart.actions';
import { Checkout } from 'src/app/store/model';
import { NotifierService } from 'angular-notifier';
import { Title } from '@angular/platform-browser';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-success',
  templateUrl: './orderInfo.component.html',
  styleUrls: ['./orderInfo.component.scss']
})
export class OrderInfoComponent implements OnInit {
  paramSubscription: Subscription;

  orderId: number;
  orderState: Observable<OrderState>;
  orderData: Checkout;

  orderLine = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private orderService: OrderService,
    private notifierService: NotifierService,
    private titleMeta: Title,
    private translatePipe: TranslatePipe
  ) {
  }

  ngOnInit() {
    // this.orderState = this.store.select('order');

    this.paramSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.orderId = params.orderId;

        this.orderService.getOrderById(this.orderId).pipe(take(1), catchError(
          error => {
            this.notifierService.notify('error', this.translatePipe.transform('Có lỗi xảy ra trong quá trình tải dữ liệu!'));
            if (error.status === 400) {
              this.store.dispatch(new CartActions.FetchCart());
            }
            this.router.navigate(['/cart']);
            return throwError(error);
          }
        )).subscribe((res: Checkout) => {
          this.titleMeta.setTitle(`${this.translatePipe.transform('Đơn hàng số')} ${this.orderId}`);
          this.orderData = res;
          res.orderItems.map((data, idx) => {
            this.orderLine = this.orderLine + data.product.name;
            if (idx < res.orderItems.length - 1) { this.orderLine += ', '; }
          });
        });
    });
  }

}
