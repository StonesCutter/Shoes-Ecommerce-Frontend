import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProductBoxComponent } from './info-product-box.component';

describe('InfoProductBoxComponent', () => {
  let component: InfoProductBoxComponent;
  let fixture: ComponentFixture<InfoProductBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoProductBoxComponent]
    });
    fixture = TestBed.createComponent(InfoProductBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
