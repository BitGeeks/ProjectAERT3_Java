import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewHomePageSlideComponent } from './add-new-home-page-slide.component';

describe('AddNewHomePageSlideComponent', () => {
  let component: AddNewHomePageSlideComponent;
  let fixture: ComponentFixture<AddNewHomePageSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewHomePageSlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewHomePageSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
