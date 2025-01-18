import { Component, inject, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { LoginService } from '../../../Services/login.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-t-time-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './t-time-table.component.html',
  styleUrls: ['./t-time-table.component.css']
})
export class TTimeTableComponent implements OnInit {
  enrollmentNo!: number | null;
  route = inject(Router);
  loginService = inject(LoginService);
  http = inject(HttpClient);
  teacherTimeTable: any[] = [];
  heading: string[] = ["TimeSlot", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Fetching timetableDetails data using teacher enrollment number

  getTimeTableByTeacherEnrollmentNumber(enrollmentNumber: number) {
    this.http.get(`https://localhost:7262/GetTeacherTimeTableDetails?teacherId=${enrollmentNumber}`).subscribe((res: any) => {
      if (res && res.length > 0) {
        const teacherId = res[0]?.TeacherId;
        if (teacherId) {
          this.getTeacherTimeTable(teacherId);
        } else {
          console.warn('Teacher ID not found.');
        }
      } else {
        console.warn('No data available from first API.');
      }
    }, error => {
      console.error('Error fetching first API response:', error);
    });
  }

  // Fetching timetable data using teacher ID

  getTeacherTimeTable(teacherId: number) {
    this.http.get(`https://localhost:7262/GetTeacherTimeTable?teacherId=${teacherId}`).subscribe(
      (res: any) => {
        if (res && res.length > 0) {

          const timetableMap: any = {};
          res.forEach((item: any) => {
            const timeSlot = item.Time;
            const day = item.Day;
  
            if (!timetableMap[timeSlot]) {
              timetableMap[timeSlot] = { TimeSlot: timeSlot, Subjects: {} };
            }
            timetableMap[timeSlot].Subjects[day] = {
              Subject: item.Subject,
              ClassName: item.ClassName,
              SectionName: item.SectionName,
            };
          });
  
          this.teacherTimeTable = Object.values(timetableMap);
  
          console.log('Teacher timetable:', this.teacherTimeTable);
        } else {
          console.warn('No data received from the second API.');
        }
      },
      (error) => {
        console.error('Error fetching teacher timetable:', error);
      }
    );
  }
  

  ngOnInit(): void {
    this.enrollmentNo = this.loginService.enrollmentNumber;
    if (this.enrollmentNo) {
      this.getTimeTableByTeacherEnrollmentNumber(this.enrollmentNo);
    }
  }
}
