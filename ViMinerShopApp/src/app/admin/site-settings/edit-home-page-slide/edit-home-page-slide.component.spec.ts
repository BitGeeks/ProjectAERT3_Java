import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHomePageSlideComponent } from './edit-home-page-slide.component';

describe('EditHomePageSlideComponent', () => {
  let component: EditHomePageSlideComponent;
  let fixture: ComponentFixture<EditHomePageSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHomePageSlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHomePageSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
