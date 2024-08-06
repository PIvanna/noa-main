import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOfOrderComponent } from './history-of-order.component';

describe('HistoryOfOrderComponent', () => {
  let component: HistoryOfOrderComponent;
  let fixture: ComponentFixture<HistoryOfOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryOfOrderComponent]
    });
    fixture = TestBed.createComponent(HistoryOfOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
