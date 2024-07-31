import { Component } from '@angular/core';
import { StudMenuComponent } from "../stud-menu/stud-menu.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-open-ser',
  standalone: true,
  imports: [StudMenuComponent,RouterLink,RouterOutlet,RouterLinkActive,NavbarComponent],
  templateUrl: './open-ser.component.html',
  styleUrl: './open-ser.component.css'
})
export class OpenSerComponent {

}
