import { Component } from '@angular/core';
import { Chart, registerables, ChartData } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-doughtnut-ratio-bg',
  standalone: true,
  imports: [],
  templateUrl: './doughtnut-ratio-bg.component.html',
  styleUrl: './doughtnut-ratio-bg.component.css',
})
export class DoughtnutRatioBGComponent {
  public BoyGirl: any = {
    type: 'doughnut',
    data: {
      labels: ['Boys', 'Girls'],
      datasets: [
        {
          data: [45414, 40270],
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
  chart2: any;
  ngOnInit(): void {
    this.chart2 = new Chart('BoyGirl', this.BoyGirl);
  }
}
