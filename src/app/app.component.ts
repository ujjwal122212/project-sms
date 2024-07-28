

import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { NavbarComponent } from './components/student/navbar/navbar.component';

import { MenubarComponent } from './components/student/menubar/menubar.component';
import { TNavbarComponent } from './components/teacher/t-navbar/t-navbar.component';
import { TMenubarComponent } from './components/teacher/t-menubar/t-menubar.component';
import { MainNavbarComponent } from './components/Main-Page/main-navbar/main-navbar.component';
import { ANavbarComponent } from './components/Admin/a-navbar/a-navbar.component';
import { AMenubarComponent } from './components/Admin/a-menubar/a-menubar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MenubarComponent,NavbarComponent,RouterLink,TNavbarComponent,TMenubarComponent,MainNavbarComponent,ANavbarComponent,AMenubarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'I-Portal';
  constructor(private router: Router) {}

  goToAbout() {
    this.router.navigate(['/Login-page']);
  }
}
