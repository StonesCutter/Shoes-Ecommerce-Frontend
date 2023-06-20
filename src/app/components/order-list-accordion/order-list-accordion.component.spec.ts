import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListAccordionComponent } from './order-list-accordion.component';

describe('OrderListAccordionComponent', () => {
  let component: OrderListAccordionComponent;
  let fixture: ComponentFixture<OrderListAccordionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderListAccordionComponent]
    });
    fixture = TestBed.createComponent(OrderListAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
