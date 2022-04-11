import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HighPerformanceMinerComponent } from './high-performance-miner.component';

describe('HighPerformanceMinerComponent', () => {
  let component: HighPerformanceMinerComponent;
  let fixture: ComponentFixture<HighPerformanceMinerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HighPerformanceMinerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighPerformanceMinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
