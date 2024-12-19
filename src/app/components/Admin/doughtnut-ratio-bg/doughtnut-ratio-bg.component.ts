import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Chart, registerables, ChartData } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-doughtnut-ratio-bg',
  standalone: true,
  imports: [],
  templateUrl: './doughtnut-ratio-bg.component.html',
  styleUrls: ['./doughtnut-ratio-bg.component.css'],
})
export class DoughtnutRatioBGComponent {
  boy: number = 0;
  girl: number = 0;
  chart2: any;

  constructor(private http: HttpClient) {}

  loadTotalBoyGirl() {
    this.http.get<any[]>('https://localhost:7262/GetTotalMaleandFemaleinStudents').subscribe((response) => {
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
      this.updateChart();
    });
  }
  updateChart() {
    if (this.chart2) {
      this.chart2.data.datasets[0].data = [this.boy, this.girl];
      this.chart2.update();
    }
  }

  // Doughnut chart 
  public BoyGirl: any = {
    type: 'doughnut',
    data: {
      labels: ['Boys', 'Girls'],
      datasets: [
        {
          data: [this.boy, this.girl], 
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
    this.loadTotalBoyGirl();
    this.chart2 = new Chart('BoyGirl', this.BoyGirl);
  }
}

