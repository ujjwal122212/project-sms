import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { AMenubarComponent } from '../a-menubar/a-menubar.component';
import { ViewStudentComponent } from '../addStudent/view-student/view-student.component';
import { ADashboardComponent } from '../a-dashboard/a-dashboard.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MainProfileComponent } from '../../main-profile-data/main-profile/main-profile.component';
import { AdminProfileComponent } from '../admin-profile/admin-profile.component';
import { LoginService } from '../../../Services/login.service';
import { AdminRegistrationService } from '../../../Services/admin-registration.service';


@Component({
  selector: 'app-a-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, AdminProfileComponent,RouterLinkActive],
  templateUrl: './a-navbar.component.html',
  styleUrl: './a-navbar.component.css',
  viewProviders: [AMenubarComponent, ViewStudentComponent]
})
export class ANavbarComponent {
  constructor(private _menudark: AMenubarComponent, private _viewStudent: ViewStudentComponent) {

  }
  enrollmentNo!:number|null;
  teacher:any;
  route = inject(Router);
  loginService = inject(LoginService);
  regService=inject(AdminRegistrationService);
  getTeacherById(enrollmentNo:number){
    this.regService.getAdminById(enrollmentNo).subscribe((res:any)=>{
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
  show = false;
  openProfile() {
    this.show = !this.show;
  }


}
