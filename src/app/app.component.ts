

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MenubarComponent } from './menubar/menubar.component';
import { NavbarComponent } from './navbar/navbar.component';
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
