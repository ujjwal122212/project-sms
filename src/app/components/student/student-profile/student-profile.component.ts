import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../Services/login.service';
import { StudentRegistrationService } from '../../../Services/student-registration.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent implements OnInit {
  imagePath!: String
  route = inject(Router);
  loginService = inject(LoginService);
  regService = inject(StudentRegistrationService);
  enrollmentNo!: number | null
  student: any;
  getStudentByEnrollmentNumber(enrollmentNo: number) {
    this.regService.getStudentDetailByStudentId(enrollmentNo).subscribe((res: any) => {
      this.student = res;
      const studentImagePath = res.imagePath;
      this.imagePath = studentImagePath.split("Student_images/")[1];
      //  console.log(this.student);
    })
  }
  EditStudent(enrollentNumber: number) {
    this.route.navigateByUrl('/studentlayout/studentprofile/editProfile/' + enrollentNumber);
  }
  ngOnInit(): void {
    this.enrollmentNo = this.loginService.enrollmentNumber;
    if (this.enrollmentNo) {
      console.log('Login Enrollment Number:', this.enrollmentNo);
      this.getStudentByEnrollmentNumber(this.enrollmentNo);
    }
  }
}
