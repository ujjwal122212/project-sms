import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-attendence',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './student-attendence.component.html',
  styleUrls: ['./student-attendence.component.css']
})
export class StudentAttendenceComponent implements OnInit {
  SectionId!: number;
  attendenceForm: FormGroup;
  students: any[] = [];
  attendanceDate: string = new Date().toISOString().split('T')[0];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Initialize the form
    this.attendenceForm = this.fb.group({
      attendenceRecords: this.fb.array([])
    });
  }

  get attendenceRecords(): FormArray {
    return this.attendenceForm.get('attendenceRecords') as FormArray;
  }

  addAttendenceRecord(student: any) {
    const attendenceRecord = this.fb.group({
      attendanceId: [0],
      studentName: [student.studentName],
      enrollmentNumber: [student.enrollmentNumber, Validators.required],
      sectionId: [this.SectionId, Validators.required],
      attendanceDate: [this.attendanceDate, Validators.required],
      isPresent: [true, Validators.required]
    });
    this.attendenceRecords.push(attendenceRecord);
  }

  loadStudentsBySectionId(sectionId: number) {
    this.http.get(`https://localhost:7262/GetStudentsBySectionID/${sectionId}`).subscribe(
      (res: any) => {
        this.students = res;
        this.populateFormWithStudents(res);
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  populateFormWithStudents(students: any[]) {
    students.forEach((student) => {
      this.addAttendenceRecord(student);
    });
  }

  submitAttendance() {
    if (this.attendenceForm.valid) {
      const payload = {
        SectionId: this.SectionId,
        AttendanceDate: this.attendanceDate,
        AttendanceRecords: this.attendenceForm.value.attendenceRecords.map((record: any) => ({
          attendanceId: record.attendanceId,
          enrollmentNumber: record.enrollmentNumber,
          sectionId: record.sectionId,
          attendanceDate: record.attendanceDate,
          isPresent: record.isPresent
        }))
      };
      this.http.post('https://localhost:7262/TakeAttendanceByDate', payload).subscribe(
        (response: any) => {
          alert(response.message);
        },
        (error: HttpErrorResponse) => {
         alert(error.error.message);
        }
      );
    }
  }

  route = inject(ActivatedRoute);
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.SectionId = +params['SectionId'];
      if (this.SectionId) {
        this.loadStudentsBySectionId(this.SectionId);
      } else {
        alert('Invalid Section ID');
      }
    });
  }
}
