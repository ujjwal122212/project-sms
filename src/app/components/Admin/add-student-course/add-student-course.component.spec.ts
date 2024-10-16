import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentCourseComponent } from './add-student-course.component';

describe('AddStudentCourseComponent', () => {
  let component: AddStudentCourseComponent;
  let fixture: ComponentFixture<AddStudentCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStudentCourseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddStudentCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
