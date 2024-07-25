

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AMenubarComponent } from './Admin/a-menubar/a-menubar.component';
import { ANavbarComponent } from './Admin/a-navbar/a-navbar.component';
import { MenubarComponent } from './menubar/menubar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TMenubarComponent } from './teacher/t-menubar/t-menubar.component';
import { TNavbarComponent } from "./teacher/t-navbar/t-navbar.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, MenubarComponent, TMenubarComponent, TNavbarComponent,ANavbarComponent,AMenubarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sms';
}
