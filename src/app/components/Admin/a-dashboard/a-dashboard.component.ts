import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DarkModeService } from '../../../dark-mode.service';
@Component({
  selector: 'app-a-dashboard',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './a-dashboard.component.html',
  styleUrl: './a-dashboard.component.css'
})
export class ADashboardComponent {
  // isAvailable:boolean=false;
  // dashboardDarkMode(){
  //  const dash=document.querySelector('#h-component');
  //  console.log(dash);
  //  console.log('executing');
  //  dash?.classList.toggle('dark');
  // }

  isDarkMode = false;

  constructor(private darkModeService: DarkModeService) {}

  ngOnInit() {
    this.darkModeService.isDarkMode$.subscribe(
      (darkMode) => (this.isDarkMode = darkMode)
    );
  }
}
