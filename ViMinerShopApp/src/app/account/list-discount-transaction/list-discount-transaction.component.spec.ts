import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDiscountTransactionComponent } from './list-discount-transaction.component';

describe('ListDiscountTransactionComponent', () => {
  let component: ListDiscountTransactionComponent;
  let fixture: ComponentFixture<ListDiscountTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDiscountTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDiscountTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
