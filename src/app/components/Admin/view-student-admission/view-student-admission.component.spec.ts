import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentAdmissionComponent } from './view-student-admission.component';

describe('ViewStudentAdmissionComponent', () => {
  let component: ViewStudentAdmissionComponent;
  let fixture: ComponentFixture<ViewStudentAdmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewStudentAdmissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewStudentAdmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
