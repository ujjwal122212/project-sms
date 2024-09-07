import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { AMenubarComponent } from '../a-menubar/a-menubar.component';
import { ViewStudentComponent } from '../addStudent/view-student/view-student.component';
import { ADashboardComponent } from '../a-dashboard/a-dashboard.component';


@Component({
  selector: 'app-a-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './a-navbar.component.html',
  styleUrl: './a-navbar.component.css',
  viewProviders: [AMenubarComponent, ViewStudentComponent]
})
export class ANavbarComponent {
  constructor(private _menudark: AMenubarComponent, private _viewStudent: ViewStudentComponent) {

  }
  //  @ViewChild(ADashboardComponent) dashboard!:ADashboardComponent;


}
