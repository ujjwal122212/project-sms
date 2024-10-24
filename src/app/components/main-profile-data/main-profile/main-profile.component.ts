import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../Services/login.service';

@Component({
  selector: 'app-main-profile',
  standalone: true,
  imports: [],
  templateUrl: './main-profile.component.html',
  styleUrl: './main-profile.component.css'
})
export class MainProfileComponent {
route=inject(Router);
loginService = inject(LoginService);
logout(){
  this.loginService.logout();
  this.route.navigateByUrl('/Login-page');
}
}
