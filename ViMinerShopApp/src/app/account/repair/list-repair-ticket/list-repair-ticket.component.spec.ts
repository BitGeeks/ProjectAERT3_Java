import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRepairTicketComponent } from './list-repair-ticket.component';

describe('ListRepairTicketComponent', () => {
  let component: ListRepairTicketComponent;
  let fixture: ComponentFixture<ListRepairTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRepairTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRepairTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
