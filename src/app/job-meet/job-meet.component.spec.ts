import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobMeetComponent } from './job-meet.component';

describe('JobMeetComponent', () => {
  let component: JobMeetComponent;
  let fixture: ComponentFixture<JobMeetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobMeetComponent]
    });
    fixture = TestBed.createComponent(JobMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
