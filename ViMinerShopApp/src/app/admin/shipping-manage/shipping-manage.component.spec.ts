import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingManageComponent } from './shipping-manage.component';

describe('ShippingManageComponent', () => {
  let component: ShippingManageComponent;
  let fixture: ComponentFixture<ShippingManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
