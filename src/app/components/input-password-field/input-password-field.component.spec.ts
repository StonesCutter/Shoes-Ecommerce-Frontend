import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPasswordFieldComponent } from './input-password-field.component';

describe('InputPasswordFieldComponent', () => {
  let component: InputPasswordFieldComponent;
  let fixture: ComponentFixture<InputPasswordFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputPasswordFieldComponent]
    });
    fixture = TestBed.createComponent(InputPasswordFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
