import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageSlideComponent } from './home-page-slide.component';

describe('HomePageSlideComponent', () => {
  let component: HomePageSlideComponent;
  let fixture: ComponentFixture<HomePageSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageSlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
