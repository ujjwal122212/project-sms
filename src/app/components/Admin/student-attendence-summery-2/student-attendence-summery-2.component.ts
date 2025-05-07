import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentRegistrationService } from '../../../Services/student-registration.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-attendence-summery-2',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './student-attendence-summery-2.component.html',
  styleUrl: './student-attendence-summery-2.component.css'
})
export class StudentAttendenceSummery2Component implements OnInit {
  attendenceformOfStudent: FormGroup;
  Classes: any[] = [];
  Sections: any[] = [];
  StudentRecords: any[] = [];
  students: any[] = []; // Transformed data
  dates: string[] = []; // Unique sorted dates
  selectedClass: number = 0;

  http = inject(HttpClient);
  regService = inject(StudentRegistrationService);

  constructor(private fb: FormBuilder) {
    this.attendenceformOfStudent = this.fb.group({
      classId: [''],
      sectionId: ['', Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses() {
    this.regService.getClasses().subscribe((res: any) => {
      this.Classes = res;
    });
  }

  onClassChange(event: any) {
    this.selectedClass = event.target.value;
    this.loadSectionBtClasssId(this.selectedClass);
  }

  loadSectionBtClasssId(classId: number) {
    this.regService.getSectionByClassId(classId).subscribe((res: any) => {
      this.Sections = res;
    });
  }

  onSubmit() {
    if (this.attendenceformOfStudent.invalid) {
      alert('Please fill in all the valid details');
      return;
    }

    const formValue = this.attendenceformOfStudent.value;

    this.http.post(`https://localhost:7262/Admin/GetSectionAttendanceByDateRange`, formValue)
      .subscribe((res: any) => {
        this.StudentRecords = res;

        const loadNames = this.StudentRecords.map((record, index) => {
          return this.http.get(`https://localhost:7262/GetStudentByIdAllDetails/${record.enrollmentNumber}`)
            .toPromise()
            .then((student: any) => {
              this.StudentRecords[index].studentName = student.studentName;
            });
        });

        Promise.all(loadNames).then(() => {
          this.processAttendanceData();
          this.resetForm();
        });
      });
  }

  processAttendanceData() {
    const studentMap = new Map<string, any>();
    const dateSet = new Set<string>();

    this.StudentRecords.forEach(record => {
      const date = record.attendanceDate.split('T')[0];
      dateSet.add(date);

      const key = `${record.enrollmentNumber}-${record.studentName}`;
      if (!studentMap.has(key)) {
        studentMap.set(key, {
          studentName: record.studentName,
          enrollmentNumber: record.enrollmentNumber,
          attendance: {}
        });
      }

      const student = studentMap.get(key);
      student.attendance[date] = record.isPresent;
    });

    this.dates = Array.from(dateSet).sort();
    this.students = Array.from(studentMap.values());
  }

  resetForm() {
    this.Classes = [];
    this.Sections = [];
    this.attendenceformOfStudent.patchValue({
      classId: '',
      sectionId: '',
      fromDate: null,
      toDate: null
    })
    this.loadClasses();
  }
}
