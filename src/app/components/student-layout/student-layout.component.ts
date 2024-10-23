import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenubarComponent } from '../student/menubar/menubar.component';
import { NavbarComponent } from '../student/navbar/navbar.component';

@Component({
  selector: 'app-student-layout',
  standalone: true,
  imports: [RouterOutlet,MenubarComponent,NavbarComponent,RouterLink],
  templateUrl: './student-layout.component.html',
  styleUrl: './student-layout.component.css'
})
export class StudentLayoutComponent {

}
