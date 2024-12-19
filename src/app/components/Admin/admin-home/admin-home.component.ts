import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarAttendenceStudentComponent } from '../bar-attendence-student/bar-attendence-student.component';

import { Chart, registerables, ChartData } from 'chart.js';
import { DoughtnutRatioBGComponent } from '../doughtnut-ratio-bg/doughtnut-ratio-bg.component';
import { HttpClient } from '@angular/common/http';
import { DoughtnutRatioTeacherComponent } from '../doughtnut-ratio-teacher/doughtnut-ratio-teacher.component';
import { BarAttendenceTeacherComponent } from "../bar-attendence-teacher/bar-attendence-teacher.component";

Chart.register(...registerables);
@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [
    BarAttendenceStudentComponent,
    DoughtnutRatioBGComponent,
    DoughtnutRatioTeacherComponent,
    BarAttendenceTeacherComponent
],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css',
})
export class AdminHomeComponent implements OnInit {
  student: any;
  teacher: any;
  boy: number = 0;
  girl: number = 0;
  // Teacher
  male: number = 0;
  female: number = 0;
  // chart2: any;
  incomeData = [
    500000, 600000, 700000, 800000, 900000, 1000000, 100000, 120000, 1300000,
    14, 150000, 1600000,
  ];
  expenseData = [
    400000, 500000, 600, 700000, 8000, 9000, 1000000, 1100000, 1200000, 130000,
    1400000, 1500000,
  ];

  constructor(private http: HttpClient) {}

  loadTotalTecaher() {
    this.http
      .get('https://localhost:7262/GetTotalTeachers')
      .subscribe((response: any) => {
        this.teacher = response[0]?.TotalTeachers;
        console.log(this.teacher);
      });
  }
  loadTotalStudent() {
    this.http
      .get('https://localhost:7262/GetTotalStudents')
      .subscribe((response: any) => {
        this.student = response[0]?.TotalStudents;
        console.log(this.student);
      });
  }

  loadTotalBoyGirl() {
    this.http
      .get<any[]>('https://localhost:7262/GetTotalMaleandFemaleinStudents')
      .subscribe((response) => {
        this.boy = 0;
        this.girl = 0;
        response.forEach((entry) => {
          if (entry.Gender === 'Male') {
            this.boy += entry.TotalStudents;
          } else if (entry.Gender === 'Female') {
            this.girl += entry.TotalStudents;
          }
        });
        console.log('Number of Male Students: ', this.boy);
        console.log('Number of Female Students: ', this.girl);
      });
  }
  loadTotalMaleFemale() {
    this.http
      .get<any[]>('https://localhost:7262/GetTotalMaleandFemale')
      .subscribe((response) => {
        this.male = 0;
        this.female = 0;
        response.forEach((entry) => {
          if (entry.Gender === 'Male') {
            this.male += entry.TotalTeachers;
          } else if (entry.Gender === 'Female') {
            this.female += entry.TotalTeachers;
          }
        });

        console.log('Number of Male Students: ', this.male);
        console.log('Number of Female Students: ', this.female);
      });
  }

  public Attendence: any = {
    type: 'line',
    data: {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      datasets: [
        {
          label: 'Income',
          data: this.incomeData,
          borderColor: '#60A5FA',
          backgroundColor: 'rgba(96, 165, 250, 0.2)',
          hoverBackgroundColor: ['#3B82F6'],
          fill: true,
        },
        {
          label: 'Expense',
          data: this.expenseData,
          borderColor: '#FBBF24',
          backgroundColor: 'rgba(251, 191, 36, 0.2)',
          hoverBackgroundColor: ['#F59E0B'],
          fill: true,
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

  chart2: any;
  ngOnInit(): void {
    this.loadTotalStudent();
    this.loadTotalTecaher();
    this.loadTotalBoyGirl();
    this.loadTotalMaleFemale();
    this.chart2 = new Chart('MyChart2', this.Attendence);
  }
}
