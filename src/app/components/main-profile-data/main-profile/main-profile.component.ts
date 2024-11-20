import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../Services/login.service';
import { StudentRegistrationService } from '../../../Services/student-registration.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-profile',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './main-profile.component.html',
  styleUrl: './main-profile.component.css'
})
export class MainProfileComponent implements OnInit {
  route = inject(Router);
  loginService = inject(LoginService);
  regService = inject(StudentRegistrationService);
  enrollmentNo!: number | null
  student:any;
  logout() {
    this.loginService.logout();
    this.route.navigateByUrl('/Login-page');
  }
  getStudentByEnrollmentNumber(enrollmentNo: number) {
    this.regService.getStudentDetailByStudentId(enrollmentNo).subscribe((res:any)=>{
     this.student=res;
     console.log(this.student);
    })
  }
 
  ngOnInit(): void {
    this.enrollmentNo = this.loginService.enrollmentNumber;
    if (this.enrollmentNo) {
      console.log('Login Enrollment Number:', this.enrollmentNo);
      this.getStudentByEnrollmentNumber(this.enrollmentNo);
    }
  }
}
