import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairTicketManageComponent } from './repair-ticket-manage.component';

describe('RepairTicketManageComponent', () => {
  let component: RepairTicketManageComponent;
  let fixture: ComponentFixture<RepairTicketManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairTicketManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairTicketManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
