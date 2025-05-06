import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendenceSummeryComponent } from './student-attendence-summery.component';

describe('StudentAttendenceSummeryComponent', () => {
  let component: StudentAttendenceSummeryComponent;
  let fixture: ComponentFixture<StudentAttendenceSummeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAttendenceSummeryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentAttendenceSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
