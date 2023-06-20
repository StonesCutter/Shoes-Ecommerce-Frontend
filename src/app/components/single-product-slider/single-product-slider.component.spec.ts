import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProductSliderComponent } from './single-product-slider.component';

describe('SingleProductSliderComponent', () => {
  let component: SingleProductSliderComponent;
  let fixture: ComponentFixture<SingleProductSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleProductSliderComponent]
    });
    fixture = TestBed.createComponent(SingleProductSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
