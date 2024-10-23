import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ANavbarComponent } from '../Admin/a-navbar/a-navbar.component';
import { AMenubarComponent } from '../Admin/a-menubar/a-menubar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink,ANavbarComponent, AMenubarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
