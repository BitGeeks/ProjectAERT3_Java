import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppChangelogComponent } from './app-changelog.component';

describe('AppChangelogComponent', () => {
  let component: AppChangelogComponent;
  let fixture: ComponentFixture<AppChangelogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppChangelogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppChangelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
