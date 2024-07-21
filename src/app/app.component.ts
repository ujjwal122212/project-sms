

import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MenubarComponent } from './menubar/menubar.component';
import { TMenubarComponent } from './teacher/t-menubar/t-menubar.component';
import { TNavbarComponent } from "./teacher/t-navbar/t-navbar.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, MenubarComponent, TMenubarComponent, TNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sms';
}
