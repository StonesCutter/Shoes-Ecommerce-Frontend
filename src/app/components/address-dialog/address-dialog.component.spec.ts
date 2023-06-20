import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressDialogComponent } from './address-dialog.component';

describe('AddressDialogComponent', () => {
  let component: AddressDialogComponent;
  let fixture: ComponentFixture<AddressDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddressDialogComponent]
    });
    fixture = TestBed.createComponent(AddressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
