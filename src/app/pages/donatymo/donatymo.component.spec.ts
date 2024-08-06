import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatymoComponent } from './donatymo.component';

describe('DonatymoComponent', () => {
  let component: DonatymoComponent;
  let fixture: ComponentFixture<DonatymoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonatymoComponent]
    });
    fixture = TestBed.createComponent(DonatymoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
