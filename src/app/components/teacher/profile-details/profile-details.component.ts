import { Component, inject, OnInit } from '@angular/core';
import { TeacherRegistrationService } from '../../../Services/teacher-registration.service';
import { Router } from '@angular/router';
import { LoginService } from '../../../Services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.css'
})
export class ProfileDetailsComponent implements OnInit {
  regService = inject(TeacherRegistrationService);
  loginService = inject(LoginService);
  teacher: any;
  enrollmentNo!: number | null;
  constructor(private route: Router) {

  }
  getTeacherById(enrollmentNo: number) {
    this.regService.getAllTeacherDetailsByEnrollmentNumber(enrollmentNo).subscribe((res: any) => {
      this.teacher = res;
      // console.log(res);
    })
  }
  editDetails(enrollmentNumber:number){
    this.route.navigateByUrl('/teacherlayout/profiledetails/editdetails/'+enrollmentNumber);
  }
  ngOnInit(): void {
    this.enrollmentNo = this.loginService.enrollmentNumber;
    if (this.enrollmentNo) {
      // console.log('Login Enrollment Number:', this.enrollmentNo);
      this.getTeacherById(this.enrollmentNo);
    }
  }
}
