import { Component, OnInit } from '@angular/core';
import { Chart, registerables, ChartData, ChartConfiguration } from 'chart.js';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface WeeklyAttendance {
  day: string;
  totalPresent: number;
  totalAbsent: number;
}
@Component({
  selector: 'app-bar-attendence-student',
  standalone: true,
  imports: [],
  templateUrl: './bar-attendence-student.component.html',
  styleUrl: './bar-attendence-student.component.css',
})
export class BarAttendenceStudentComponent {

  private WeeklyAttendenceAPI = "https://localhost:7262/Admin/GetWeeklyAttendanceSummary";
  public chart1: any;
  public attendanceData: WeeklyAttendance[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchWeeklyAttendance();
  }

  private fetchWeeklyAttendance() {
    this.http.get<WeeklyAttendance[]>(this.WeeklyAttendenceAPI).subscribe({
      next: (data) => {
        this.attendanceData = data;
        this.initializeChart();
      },
      error: (error) => {
        console.error('Error fetching attendance data:', error);
      }
    });
  }

  private initializeChart() {
    const chartData: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: this.attendanceData.map(item => item.day),
        datasets: [
          {
            label: 'Present',
            data: this.attendanceData.map(item => item.totalPresent),
            backgroundColor: '#FBBF24',
            hoverBackgroundColor: '#F59E0B',
          },
          {
            label: 'Absent',
            data: this.attendanceData.map(item => item.totalAbsent),
            backgroundColor: '#60A5FA',
            hoverBackgroundColor: '#3B82F6',
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 1,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Teachers'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Days'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Weekly Teacher Attendance'
          }
        }
      }
    };

    this.chart1 = new Chart('MyChart3', chartData);
  }
  // public Attendence: any = {
  //   type: 'bar',
  //   data: {
  //     labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  //     datasets: [
  //       {
  //         label: 'Present',
  //         data: [25, 30, 20, 35, 28],
  //         backgroundColor: ['#FBBF24'],
  //         hoverBackgroundColor: ['#F59E0B'],
  //       },

  //       {
  //         label: 'Absent',
  //         data: [25, 30, 20, 35, 28],
  //         backgroundColor: ['#60A5FA'],
  //         hoverBackgroundColor: ['#3B82F6'],
  //       },
  //     ],
  //   },
  //   options: {
  //     aspectRatio: 1,
  //     scales: {
  //       y: {
  //         beginAtZero: true, // Ensures the Y-axis starts at zero
  //       },
  //     },
  //   },
  //   plugins: [],
  // };
  // chart1: any;
  // ngOnInit(): void {
  //   this.chart1 = new Chart('MyChart1', this.Attendence);
  // }
}
