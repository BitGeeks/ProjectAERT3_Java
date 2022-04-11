import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewMinerComponent } from './new-miner.component';

describe('NewMinerComponent', () => {
  let component: NewMinerComponent;
  let fixture: ComponentFixture<NewMinerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NewMinerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
