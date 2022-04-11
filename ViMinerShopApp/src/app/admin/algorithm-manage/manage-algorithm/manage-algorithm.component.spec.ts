import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAlgorithmComponent } from './manage-algorithm.component';

describe('ManageAlgorithmComponent', () => {
  let component: ManageAlgorithmComponent;
  let fixture: ComponentFixture<ManageAlgorithmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAlgorithmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAlgorithmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
