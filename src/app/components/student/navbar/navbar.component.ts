import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { MainProfileComponent } from '../../main-profile-data/main-profile/main-profile.component';
import { ProfileCardComponent } from '../profile-card/profile-card.component';

import { StudentProfileComponent } from '../student-profile/student-profile.component';

import { CommonModule } from '@angular/common';
import { NoficationComponent } from "../../nofication/nofication.component";
// import { StudentNotificationComponent } from "../../Admin/student-notification/student-notification.component";
import { FormsModule } from '@angular/forms';
import { StudentRegistrationService } from '../../../Services/student-registration.service';
import { LoginService } from '../../../Services/login.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule,CommonModule, RouterLinkActive, MainProfileComponent, NoficationComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit{

   isProfileOpen = false;
   isNotificationOpen = false;
   route = inject(Router);
  loginService = inject(LoginService);
  regService = inject(StudentRegistrationService);
  enrollmentNo!: number | null
  student:any;
  getStudentByEnrollmentNumber(enrollmentNo: number) {
    this.regService.getStudentDetailByStudentId(enrollmentNo).subscribe((res:any)=>{
     this.student=res;
    //  console.log(this.student);
    })
  }
  EditStudent(enrollmentNumber: number) {
    this.route.navigateByUrl('');
  }
  ngOnInit(): void {
    this.enrollmentNo = this.loginService.enrollmentNumber;
    if (this.enrollmentNo) {
      // console.log('Login Enrollment Number:', this.enrollmentNo);
      this.getStudentByEnrollmentNumber(this.enrollmentNo);
    }
  }

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
   
   
}
