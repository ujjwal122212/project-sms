import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../Services/login.service';

@Component({
  selector: 'app-teacher-profile',
  standalone: true,
  imports: [],
  templateUrl: './teacher-profile.component.html',
  styleUrl: './teacher-profile.component.css'
})
export class TeacherProfileComponent {
 route=inject(Router);
 loginService = inject(LoginService);
 logout() {
  this.loginService.logout();
  this.route.navigateByUrl('/Login-page');
}
}
