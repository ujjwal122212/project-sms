import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentTimeTableComponent } from './add-student-time-table.component';

describe('AddStudentTimeTableComponent', () => {
  let component: AddStudentTimeTableComponent;
  let fixture: ComponentFixture<AddStudentTimeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStudentTimeTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddStudentTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
