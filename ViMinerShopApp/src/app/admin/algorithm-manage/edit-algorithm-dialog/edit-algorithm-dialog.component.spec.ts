import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAlgorithmDialogComponent } from './edit-algorithm-dialog.component';

describe('EditAlgorithmDialogComponent', () => {
  let component: EditAlgorithmDialogComponent;
  let fixture: ComponentFixture<EditAlgorithmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAlgorithmDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAlgorithmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
