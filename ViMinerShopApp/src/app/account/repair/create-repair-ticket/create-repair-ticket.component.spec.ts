import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRepairTicketComponent } from './create-repair-ticket.component';

describe('CreateRepairTicketComponent', () => {
  let component: CreateRepairTicketComponent;
  let fixture: ComponentFixture<CreateRepairTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRepairTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRepairTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
