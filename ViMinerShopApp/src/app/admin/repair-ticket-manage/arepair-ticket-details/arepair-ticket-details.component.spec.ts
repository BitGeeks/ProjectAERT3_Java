import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairTicketDetailsComponent } from './repair-ticket-details.component';

describe('RepairTicketDetailsComponent', () => {
  let component: RepairTicketDetailsComponent;
  let fixture: ComponentFixture<RepairTicketDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairTicketDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairTicketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
