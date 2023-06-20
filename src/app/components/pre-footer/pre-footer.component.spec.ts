import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreFooterComponent } from './pre-footer.component';

describe('PreFooterComponent', () => {
  let component: PreFooterComponent;
  let fixture: ComponentFixture<PreFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreFooterComponent]
    });
    fixture = TestBed.createComponent(PreFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
