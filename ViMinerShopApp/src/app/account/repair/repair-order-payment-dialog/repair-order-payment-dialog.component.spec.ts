import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairOrderPaymentDialogComponent } from './repair-order-payment-dialog.component';

describe('RepairOrderPaymentDialogComponent', () => {
  let component: RepairOrderPaymentDialogComponent;
  let fixture: ComponentFixture<RepairOrderPaymentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairOrderPaymentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairOrderPaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
