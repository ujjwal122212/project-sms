import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../Services/login.service';
import { TeacherRegistrationService } from '../../../Services/teacher-registration.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-profile',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './teacher-profile.component.html',
  styleUrl: './teacher-profile.component.css'
})
export class TeacherProfileComponent implements OnInit {
  enrollmentNo!:number | null;
  teacher:any;
  route = inject(Router);
  loginService = inject(LoginService);
  regService=inject(TeacherRegistrationService);
  logout() {
    this.loginService.logout();
    this.route.navigateByUrl('/Login-page');
  }
  getTeacherById(enrollmentNo:number){
   this.regService.getTeacherById(enrollmentNo).subscribe((res:any)=>{
    this.teacher=res;
    // console.log(res);
   })
  }
  ngOnInit(): void {
    this.enrollmentNo = this.loginService.enrollmentNumber;
    if (this.enrollmentNo) {
      // console.log('Login Enrollment Number:', this.enrollmentNo);
      this.getTeacherById(this.enrollmentNo);
    }
  }
}
