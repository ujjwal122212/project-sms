import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../Services/login.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attendence',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendence.component.html',
  styleUrl: './attendence.component.css'
})
export class AttendenceComponent implements OnInit {
  enrollmentNo!: number | null
  loginService = inject(LoginService);
  http = inject(HttpClient)
  attendenceDetails:any
  getAttendenceDetail(enrollmentNumber: number) {
    this.http.get(`https://localhost:7262/GetAttendenceDetails/${enrollmentNumber}`).subscribe((res: any) => {
      this.attendenceDetails=res[0];
      console.log(this.attendenceDetails);
    })
  }
  ngOnInit(): void {
    this.enrollmentNo = this.loginService.enrollmentNumber;
    if (this.enrollmentNo) {
      console.log('Login Enrollment Number:', this.enrollmentNo);
      // this.getTeacherById(this.enrollmentNo);
      this.getAttendenceDetail(this.enrollmentNo);
    }
  }

}
