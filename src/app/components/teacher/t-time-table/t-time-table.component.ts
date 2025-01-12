import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../../Services/login.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-t-time-table',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './t-time-table.component.html',
  styleUrl: './t-time-table.component.css'
})
export class TTimeTableComponent implements OnInit {
  enrollmentNo!: number | null;
  route = inject(Router);
  loginService = inject(LoginService);
  http = inject(HttpClient);
  teacherTimeTable: any[] = []
  getTimeTableByTeacherEnrollmentNumber(enrollmentNumber: number) {
    this.http.get(`https://localhost:7262/GetTeacherTimeTable?teacherId=${enrollmentNumber}`).subscribe((res: any) => {
      this.teacherTimeTable = res;
    })
  }
  ngOnInit(): void {
    this.enrollmentNo = this.loginService.enrollmentNumber;
    if (this.enrollmentNo) {
      console.log("yha par", this.enrollmentNo);
      this.getTimeTableByTeacherEnrollmentNumber(this.enrollmentNo);
    }
  }

}
