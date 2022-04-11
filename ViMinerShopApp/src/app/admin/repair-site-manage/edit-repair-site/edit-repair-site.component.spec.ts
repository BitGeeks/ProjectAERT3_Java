import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRepairSiteComponent } from './edit-repair-site.component';

describe('EditRepairSiteComponent', () => {
  let component: EditRepairSiteComponent;
  let fixture: ComponentFixture<EditRepairSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRepairSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRepairSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
