import { Component, inject, OnInit } from '@angular/core';
import { StudenttimetableService } from '../../../Services/studenttimetable.service';
import { LoginService } from '../../../Services/login.service';
import { StudentRegistrationService } from '../../../Services/student-registration.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-time-table',
  standalone: true,
  imports: [],
  templateUrl: './time-table.component.html',
  styleUrl: './time-table.component.css',
})
export class TimeTableComponent implements OnInit {
  enrollmentNo!: number | null;
  sectionId!: number;
  timetableService = inject(StudenttimetableService);
  loginService = inject(LoginService);
  regService = inject(StudentRegistrationService);
  timeTable: any[] = [];
  students: any[] = [];
  tableHeader: string[] = [
    'S.No',
    'TimeSlot',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  constructor() {}
  getStudentByEnrollmentNumber(enrollmentNo: number) {
    this.regService
      .getStudentByStudentID(enrollmentNo)
      .subscribe((result: any) => {
        this.students = result;
        this.sectionId = result.sectionId;
        this.getTimetableBySectionId(this.sectionId);
        this.getTimetableDetail(this.sectionId)
        // console.log('Here sectionId is', this.sectionId);
        // console.log(this.students);
      });
  }
  getTimetableBySectionId(id: number) {
    this.timetableService.getTimeTableBySectionId(id).subscribe((res: any) => {
      this.timeTable = res;
      // console.log(this.timeTable);
    });
  }

  // Time table detail
  timeTableDetail: any[] = [];
  http=inject(HttpClient)
  tableDetailHeader: string[] = ['Day', 'Time', 'Teacher Name', 'Subject name'];
  getTimetableDetail(id: number) {
    this.http.get(`https://localhost:7262/TimeTablesDetails/${id}`).subscribe({
      next: (res: any) => {
        this.timeTableDetail = res;
        // console.log(this.timeTableDetail);
      },
      error: (err) => {
        console.error('Error fetching timetable details:', err);
      }
    });
  }
  
  ngOnInit(): void {
    this.enrollmentNo = this.loginService.enrollmentNumber;

    if (this.enrollmentNo) {
      // console.log('Login Enrollment Number:', this.enrollmentNo);
      this.getStudentByEnrollmentNumber(this.enrollmentNo);
    }
  }
}
