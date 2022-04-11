import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRepairSiteComponent } from './manage-repair-site.component';

describe('ManageRepairSiteComponent', () => {
  let component: ManageRepairSiteComponent;
  let fixture: ComponentFixture<ManageRepairSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRepairSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRepairSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
