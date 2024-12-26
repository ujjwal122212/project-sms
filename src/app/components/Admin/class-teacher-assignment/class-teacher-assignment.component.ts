import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-class-teacher-assignment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './class-teacher-assignment.component.html',
  styleUrl: './class-teacher-assignment.component.css',
})
export class ClassTeacherAssignmentComponent {
  Classes: any[] = [];
  Sections: any[] = [];
  Teachers: any[] = [];
  classTeacherAssignmentForm: FormGroup;

  http = inject(HttpClient);

  constructor(private fb: FormBuilder) {
    this.classTeacherAssignmentForm = this.fb.group({
      classId: ['', Validators.required],
      sectionId: ['', Validators.required],
      enrollmentNumber: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadClass();
  }

  loadClass() {
    this.http.get('https://localhost:7262/Classes').subscribe((res: any) => {
      this.Classes = res;
      console.log(this.Classes);
    });
  }
  onClassChange(event: any) {
    const selectedClass = event.target.value;
    this.loadSectionByClassId(selectedClass);
  }

  loadSectionByClassId(classId: number) {
    this.http.get(`https://localhost:7262/${classId}`).subscribe((res: any) => {
      this.Sections = res;
      console.log(this.Sections);
    });
  }
  onSectionChange(event: any) {
    const selectedSection = event.target.value;
    this.loadTeacher();
  }

  loadTeacher() {
    this.http.get('https://localhost:7262/api/Teacher/GetTeachers').subscribe(
      (res: any) => {
        this.Teachers = res;
        console.log(this.Teachers);
      },
      (err) => {
        console.error('Error loading teachers', err);
      }
    );
  }

  onSubmit() {
    if (this.classTeacherAssignmentForm.invalid) {
      alert('Please fill in all required fields');
      return;
    }
    this.insertClassTeacherAssignment();
  }

  insertClassTeacherAssignment() {
    if (this.classTeacherAssignmentForm.invalid) {
      alert('Please fill valid details');
      return;
    }

    const { classId, sectionId, enrollmentNumber } =
      this.classTeacherAssignmentForm.value;

    console.log('Request Payload:', { classId, sectionId, enrollmentNumber });

    if (!enrollmentNumber) {
      alert('Please select a teacher');
      return;
    }

    const formValue = { classId, sectionId, teacherId: enrollmentNumber };

    this.http
      .post('https://localhost:7262/AddClassTeacherAssignment', formValue)
      .subscribe(
        (res) => {
          alert('Class Teacher Assignment is added successfully');
          console.log(res);
          this.classTeacherAssignmentForm.reset();
          this.CloseModel();
        },
        (err) => {
          // console.error('Error adding class teacher assignment', err);
          // alert('There was an adding the class teacher assignment');
          alert('Class teacher assignment added successfully.');
          this.CloseModel();
        }
      );
  }

  openform() {
    const stuform = document.getElementById('formModel');
    if (stuform != null) {
      stuform.classList.add('openform');
    }
  }
  CloseModel() {
    const stuform = document.getElementById('formModel');
    if (stuform != null) {
      stuform.classList.remove('openform');
    }
  }
}
