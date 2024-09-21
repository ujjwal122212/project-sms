import { Component } from '@angular/core';
import { Chart, registerables, ChartData } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-bar-attendence-student',
  standalone: true,
  imports: [],
  templateUrl: './bar-attendence-student.component.html',
  styleUrl: './bar-attendence-student.component.css',
})
export class BarAttendenceStudentComponent {
  public Attendence: any = {
    type: 'bar',
    data: {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      datasets: [
        {
          label: 'Present',
          data: [25, 30, 20, 35, 28],
          backgroundColor: ['#FBBF24'],
          hoverBackgroundColor: ['#F59E0B'],
        },

        {
          label: 'Absent',
          data: [25, 30, 20, 35, 28],
          backgroundColor: ['#60A5FA'],
          hoverBackgroundColor: ['#3B82F6'],
        },
      ],
    },
    options: {
      aspectRatio: 1,
      scales: {
        y: {
          beginAtZero: true, // Ensures the Y-axis starts at zero
        },
      },
    },
    plugins: [],
  };
  chart1: any;
  ngOnInit(): void {
    this.chart1 = new Chart('MyChart1', this.Attendence);
  }
}
