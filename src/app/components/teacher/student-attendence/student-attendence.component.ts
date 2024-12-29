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
    this.attendenceForm = this.fb.group({
      attendanceDate: [this.attendanceDate, Validators.required],
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
      // attendanceDate: [Date, Validators.required],
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
        AttendanceDate: this.attendenceForm.get('attendanceDate')?.value,
        AttendanceRecords: this.attendenceRecords.value
      };
      this.http.post('https://localhost:7262/TakeAttendanceByDate', payload).subscribe(
        (response: any) => {
          alert(response.message);
          this.resetForm();
        },
        (error: HttpErrorResponse) => {
          if (error.status === 409 && error.error?.existingAttendance) {
            alert(error.error.message);
            this.patchExistingAttendance(error.error.existingAttendance);
          } else {
            console.error('Error submitting attendance:', error);
            alert('An unexpected error occurred.');
          }
        }
      );
    }
  }



  patchExistingAttendance(existingAttendance: any[]) {
    this.attendenceRecords.clear(); 

    existingAttendance.forEach((record) => {
      const student = this.students.find(
        (s) => s.enrollmentNumber === record.enrollmentNumber
      );
      const attendanceRecord = this.fb.group({
        attendanceId: [record.attendanceId],
        studentName: [student?.studentName || 'Unknown'],
        enrollmentNumber: [record.enrollmentNumber, Validators.required],
        sectionId: [record.sectionId, Validators.required],
        isPresent: [record.isPresent ?? true, Validators.required]
      });

      this.attendenceRecords.push(attendanceRecord);
    });
  }


  resetForm() {
    this.attendenceForm.reset();
    this.attendenceRecords.clear();
    this.attendenceForm.patchValue({ attendanceDate: this.attendanceDate });
    this.loadStudentsBySectionId(this.SectionId)
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
