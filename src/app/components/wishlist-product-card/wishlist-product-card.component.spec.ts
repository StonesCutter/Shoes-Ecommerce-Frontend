import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistProductCardComponent } from './wishlist-product-card.component';

describe('WishlistProductCardComponent', () => {
  let component: WishlistProductCardComponent;
  let fixture: ComponentFixture<WishlistProductCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WishlistProductCardComponent]
    });
    fixture = TestBed.createComponent(WishlistProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
