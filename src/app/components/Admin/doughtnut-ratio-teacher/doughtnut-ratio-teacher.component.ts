import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables, ChartData } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-doughtnut-ratio-teacher',
  standalone: true,
  imports: [],
  templateUrl: './doughtnut-ratio-teacher.component.html',
  styleUrl: './doughtnut-ratio-teacher.component.css',
})
export class DoughtnutRatioTeacherComponent {
  male: number = 0;
  female: number = 0;
  chart2: any;

  constructor(private http: HttpClient) {}

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
        this.updateChart();
      });
  }
  updateChart() {
    if (this.chart2) {
      this.chart2.data.datasets[0].data = [this.male, this.female];
      this.chart2.update();
    }
  }

  // Doughnut chart
  public MaleFemale: any = {
    type: 'doughnut',
    data: {
      labels: ['Male', 'Female'],
      datasets: [
        {
          data: [this.male, this.female],
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

  ngOnInit(): void {
    this.loadTotalMaleFemale();
    this.chart2 = new Chart('MaleFemale', this.MaleFemale);
  }
}
