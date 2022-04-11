import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRepairOrderComponent } from './update-repair-order.component';

describe('UpdateRepairOrderComponent', () => {
  let component: UpdateRepairOrderComponent;
  let fixture: ComponentFixture<UpdateRepairOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRepairOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRepairOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
