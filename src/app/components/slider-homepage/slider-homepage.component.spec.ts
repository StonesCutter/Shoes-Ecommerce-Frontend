import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderHomepageComponent } from './slider-homepage.component';

describe('SliderHomepageComponent', () => {
  let component: SliderHomepageComponent;
  let fixture: ComponentFixture<SliderHomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SliderHomepageComponent]
    });
    fixture = TestBed.createComponent(SliderHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
