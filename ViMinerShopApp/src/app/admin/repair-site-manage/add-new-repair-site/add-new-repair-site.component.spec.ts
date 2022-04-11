import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRepairSiteComponent } from './add-new-repair-site.component';

describe('AddNewRepairSiteComponent', () => {
  let component: AddNewRepairSiteComponent;
  let fixture: ComponentFixture<AddNewRepairSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewRepairSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewRepairSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
