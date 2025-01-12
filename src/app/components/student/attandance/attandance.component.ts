import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../../Services/login.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-attandance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attandance.component.html',
  styleUrls: ['./attandance.component.css'],
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
            return (
              new Date(b.attendanceDate).getTime() -
              new Date(a.attendanceDate).getTime()
            );
          });
          this.isLoading = false;
        },
        (error) => {
          this.errorMessage = 'An error occurred while fetching data.';
          this.isLoading = false;
        }
      );
  }

  present: number = 0;
  absent: number = 0;
  chart2: any;

  loadAttendance(enrollmentNo: number) {
    this.htpclient
      .get(`https://localhost:7262/GetStudentAttendance/${enrollmentNo}`)
      .subscribe((res: any) => {
        this.present = 0;
        this.absent = 0;
        res.forEach((entry: any) => {
          if (entry.isPresent === true) {
            this.present += 1;
          } else if (entry.isPresent === false) {
            this.absent += 1;
          }
        });

        console.log('Number of Present: ', this.present);
        console.log('Number of Absent: ', this.absent);
        this.updateChart();
      });
  }

  updateChart() {
    if (this.chart2) {
      this.chart2.data.datasets[0].data = [this.present, this.absent];
      this.chart2.update();
    }
  }

  public PresentAbsent: any = {
    type: 'doughnut',
    data: {
      labels: ['Present', 'Absent'],
      datasets: [
        {
          data: [this.present, this.absent],
          backgroundColor: ['#60A5FA', '#FBBF24'],
          hoverBackgroundColor: ['#3B82F6', '#F59E0B'],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  };

  itemsPerPage: number = 7;
  currentPage: number = 1;

  get pagedAttendanceRecords() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.attendanceRecords.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  ngOnInit(): void {
    this.enrollmentNo = this.loginService.enrollmentNumber;

    if (this.enrollmentNo) {
      this.getStudentAttendanceByEnrollmentNumber(this.enrollmentNo);
      this.loadAttendance(this.enrollmentNo);
      this.chart2 = new Chart('PresentAbsent', this.PresentAbsent);
    }
  }
}
