import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShippingMethodDialogComponent } from './edit-shipping-method-dialog.component';

describe('EditShippingMethodDialogComponent', () => {
  let component: EditShippingMethodDialogComponent;
  let fixture: ComponentFixture<EditShippingMethodDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditShippingMethodDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShippingMethodDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
