import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [RouterLink],
  // templateUrl: './profile-card.component.html',
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent {
  route = inject(Router)
  logout() {
    this.route.navigateByUrl('/Login-page');
    localStorage.clear();
  }
}
