import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MainProfileComponent } from '../../main-profile-data/main-profile/main-profile.component';
import { CommonModule } from '@angular/common';
import { TeacherNotificationComponent } from '../teacher-notification/teacher-notification.component';
import { TeacherProfileComponent } from '../teacher-profile/teacher-profile.component';
import { LoginService } from '../../../Services/login.service';
import { TeacherRegistrationService } from '../../../Services/teacher-registration.service';

@Component({
  selector: 'app-t-navbar',
  standalone: true,
  imports: [
    RouterLink,
    TeacherProfileComponent,
    RouterLinkActive,
    CommonModule,
    TeacherNotificationComponent,
  ],
  templateUrl: './t-navbar.component.html',
  styleUrl: './t-navbar.component.css',
})
export class TNavbarComponent implements OnInit {
  isProfileOpen = false;
  isNotificationOpen = false;
  enrollmentNo!:number|null;
  teacher:any;
  route = inject(Router);
  loginService = inject(LoginService);
  regService=inject(TeacherRegistrationService);

  toggleProfile() {
    if (this.isNotificationOpen) {
      this.isNotificationOpen = false;
    }

    this.isProfileOpen = !this.isProfileOpen;
  }

  toggleNotification() {
    if (this.isProfileOpen) {
      this.isProfileOpen = false;
    }

    this.isNotificationOpen = !this.isNotificationOpen;
  }

  openNotification() {
    console.log('Notification opened');
  }
  getTeacherById(enrollmentNo:number){
    this.regService.getTeacherById(enrollmentNo).subscribe((res:any)=>{
     this.teacher=res;
     console.log(res);
    })
   }
   ngOnInit(): void {
     this.enrollmentNo = this.loginService.enrollmentNumber;
     if (this.enrollmentNo) {
       console.log('Login Enrollment Number:', this.enrollmentNo);
       this.getTeacherById(this.enrollmentNo);
     }
   }
}
