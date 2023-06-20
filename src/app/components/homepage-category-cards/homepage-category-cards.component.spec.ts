import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageCategoryCardsComponent } from './homepage-category-cards.component';

describe('HomepageCategoryCardsComponent', () => {
  let component: HomepageCategoryCardsComponent;
  let fixture: ComponentFixture<HomepageCategoryCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageCategoryCardsComponent]
    });
    fixture = TestBed.createComponent(HomepageCategoryCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
