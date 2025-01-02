import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../../Services/login.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attandance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attandance.component.html',
  styleUrls: ['./attandance.component.css'] // Corrected to styleUrls
})
export class AttandanceComponent implements OnInit {
  isLoading: boolean = true;
  errorMessage: string = '';
  enrollmentNo!: number | null;
  attendanceRecords: any[] = [];
  loginService = inject(LoginService);
  htpclient = inject(HttpClient);

  getStudentAttendanceByEnrollmentNumber(enrollmentNo: number) {
    this.htpclient
      .get(`https://localhost:7262/GetStudentAttendance/${enrollmentNo}`)
      .subscribe(
        (res: any) => {
          // Sorting the attendence by date in ascending order
          this.attendanceRecords = res.sort((a: any, b: any) => {
            return new Date(a.attendanceDate).getTime() - new Date(b.attendanceDate).getTime();
          });
          this.isLoading = false;
        },
        (error) => {
          this.errorMessage = 'An error occurred while fetching data.';
          this.isLoading = false;
        }
      );
  }
  

  ngOnInit(): void {
    this.enrollmentNo = this.loginService.enrollmentNumber;
    if (this.enrollmentNo) {
      this.getStudentAttendanceByEnrollmentNumber(this.enrollmentNo);
    }
  }
}
