import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MainProfileComponent } from '../../main-profile-data/main-profile/main-profile.component';
import { ProfileCardComponent } from '../profile-card/profile-card.component';

import { StudentProfileComponent } from '../student-profile/student-profile.component';

import { CommonModule } from '@angular/common';
import { NoficationComponent } from "../../nofication/nofication.component";
import { StudentNotificationComponent } from "../../Admin/student-notification/student-notification.component";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule, RouterLinkActive, MainProfileComponent, StudentProfileComponent, NoficationComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

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
