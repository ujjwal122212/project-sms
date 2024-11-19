import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MainProfileComponent } from '../../main-profile-data/main-profile/main-profile.component';
import { CommonModule } from '@angular/common';
import { TeacherNotificationComponent } from '../teacher-notification/teacher-notification.component';

@Component({
  selector: 'app-t-navbar',
  standalone: true,
  imports: [
    RouterLink,
    MainProfileComponent,
    RouterLinkActive,
    CommonModule,
    TeacherNotificationComponent,
  ],
  templateUrl: './t-navbar.component.html',
  styleUrl: './t-navbar.component.css',
})
export class TNavbarComponent {
  isProfileOpen = false;
  isNotificationOpen = false;

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
