import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRepairOrdersComponent } from './list-repair-orders.component';

describe('ListRepairOrdersComponent', () => {
  let component: ListRepairOrdersComponent;
  let fixture: ComponentFixture<ListRepairOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRepairOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRepairOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
