import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../Services/login.service';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent {
  route = inject(Router)
  loginService = inject(LoginService)
  logout() {
    this.loginService.logout();
    this.route.navigateByUrl('/Login-page');
  }
}
