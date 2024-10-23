import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TMenubarComponent } from '../teacher/t-menubar/t-menubar.component';
import { TNavbarComponent } from '../teacher/t-navbar/t-navbar.component';

@Component({
  selector: 'app-teacher-layout',
  standalone: true,
  imports: [RouterLink,TMenubarComponent,TNavbarComponent,RouterOutlet],
  templateUrl: './teacher-layout.component.html',
  styleUrl: './teacher-layout.component.css'
})
export class TeacherLayoutComponent {

}
