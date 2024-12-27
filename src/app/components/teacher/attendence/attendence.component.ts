import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
  route = inject(Router)
  loginService = inject(LoginService);
  http = inject(HttpClient)
  attendenceDetails: any
  getAttendenceDetail(enrollmentNumber: number) {
    this.http.get(`https://localhost:7262/GetAttendenceDetails/${enrollmentNumber}`).subscribe((res: any) => {
      this.attendenceDetails = res[0];
    })
  }
  goto(SectionId: number) {
    this.route.navigate(['teacherlayout/T-attendence/studentattendence'], {
      queryParams: { SectionId: SectionId },
    }
    )
  }
  ngOnInit(): void {
    this.enrollmentNo = this.loginService.enrollmentNumber;
    if (this.enrollmentNo) {
      this.getAttendenceDetail(this.enrollmentNo);
    }
  }

}
