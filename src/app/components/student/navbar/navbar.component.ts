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
  imports: [FormsModule, CommonModule, RouterLinkActive, MainProfileComponent, NoficationComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  imagePath!: String;
  isProfileOpen = false;
  isNotificationOpen = false;
  route = inject(Router);
  loginService = inject(LoginService);
  regService = inject(StudentRegistrationService);
  enrollmentNo!: number | null
  student: any;
  getStudentByEnrollmentNumber(enrollmentNo: number) {
    this.regService.getStudentDetailByStudentId(enrollmentNo).subscribe((res: any) => {
      this.student = res;
      const studentImagePath = res.imagePath;
      this.imagePath=studentImagePath.split("Student_images/")[1];
    })
  }
  EditStudent(enrollmentNumber: number) {
    this.route.navigateByUrl('');
  }
  ngOnInit(): void {
    const enrollmentNumber = localStorage.getItem("Id");
    const value = enrollmentNumber ? parseInt(enrollmentNumber, 10) : null;
    if (value) {
      this.getStudentByEnrollmentNumber(value);
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
