import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlgorithmComponent } from './add-algorithm.component';

describe('AddAlgorithmComponent', () => {
  let component: AddAlgorithmComponent;
  let fixture: ComponentFixture<AddAlgorithmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAlgorithmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlgorithmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
