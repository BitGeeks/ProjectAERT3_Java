import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrderStatusDialogComponent } from './edit-order-status-dialog.component';

describe('EditOrderStatusDialogComponent', () => {
  let component: EditOrderStatusDialogComponent;
  let fixture: ComponentFixture<EditOrderStatusDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOrderStatusDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrderStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
