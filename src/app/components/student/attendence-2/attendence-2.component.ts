import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-attendence-2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './attendence-2.component.html',
  styleUrl: './attendence-2.component.css'
})
export class Attendence2Component implements OnInit {
  enrollmentNo!: number;
  attendenceformOfStudent: FormGroup;
  http = inject(HttpClient);
  attendenceRecord:any[]=[];

  constructor(private fb: FormBuilder) {
    this.attendenceformOfStudent = this.fb.group({
      enrollmentNumber: [{ value: '', disabled: true }],  // Read-only and initially blank
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    const enrollmentNumber = localStorage.getItem('enrollmentNumber');
    this.enrollmentNo = enrollmentNumber ? parseInt(enrollmentNumber, 10) : 0;

    // Now bind it to the form
    this.attendenceformOfStudent.patchValue({
      enrollmentNumber: this.enrollmentNo
    });
  }

  onSubmit() {
    if (this.attendenceformOfStudent.valid) {
      const payload = {
        ...this.attendenceformOfStudent.getRawValue() // includes disabled fields
      };
      console.log('Sending payload:', payload);

      this.http.post('https://localhost:7262/GetStudentAttendanceByDateRange', payload)
        .subscribe({
          next: (response) => {
            // console.log('Response from API:', response);
            const data = Array.isArray(response) ? response : [];
            this.attendenceRecord = data.sort((a, b) => {
              return new Date(b.attendanceDate).getTime() - new Date(a.attendanceDate).getTime();
            });
            console.log(this.attendenceRecord);
          },
          error: (error) => {
            console.error('Error fetching attendance:', error);
            alert('Failed to fetch attendance. Please try again.');
          }
        });
    } else {
      this.attendenceformOfStudent.markAllAsTouched();
    }
  }
}
