import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-a-navbar',
  standalone: true,
  imports: [RouterLinkActive,RouterLink],
  templateUrl: './a-navbar.component.html',
  styleUrl: './a-navbar.component.css'
})
export class ANavbarComponent {

}
