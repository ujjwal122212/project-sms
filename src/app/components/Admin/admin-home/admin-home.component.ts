import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarAttendenceStudentComponent } from '../bar-attendence-student/bar-attendence-student.component';

import { Chart, registerables, ChartData } from 'chart.js';
import { DoughtnutRatioBGComponent } from '../doughtnut-ratio-bg/doughtnut-ratio-bg.component';

// Register all necessary components from Chart.js
Chart.register(...registerables);
@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [
    BarAttendenceStudentComponent,
    RouterOutlet,
    DoughtnutRatioBGComponent,
  ],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css',
})
export class AdminHomeComponent {
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
          data: [
            500000, 600000, 700000, 800000, 900000, 1000000, 100000, 120000,
            1300000, 14, 150000, 1600000,
          ],
          borderColor: '#60A5FA',
          backgroundColor: 'rgba(96, 165, 250, 0.2)',
          hoverBackgroundColor: ['#3B82F6'],

          fill: true,
        },
        {
          label: 'Expense',
          data: [
            400000, 500000, 600, 700000, 8000, 9000, 1000000, 1100000, 1200000,
            130000, 1400000, 1500000,
          ],
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
    this.chart2 = new Chart('MyChart2', this.Attendence);
  }
}
