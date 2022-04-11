import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewAddressComponent } from './edit-new-address.component';

describe('EditNewAddressComponent', () => {
  let component: EditNewAddressComponent;
  let fixture: ComponentFixture<EditNewAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNewAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNewAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
