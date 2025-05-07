import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendenceSummery2Component } from './student-attendence-summery-2.component';

describe('StudentAttendenceSummery2Component', () => {
  let component: StudentAttendenceSummery2Component;
  let fixture: ComponentFixture<StudentAttendenceSummery2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAttendenceSummery2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentAttendenceSummery2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
