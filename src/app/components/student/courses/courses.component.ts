import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { StudentCourseService } from '../../../Services/student-course.service';
import { CommonModule } from '@angular/common';
import { StudenttimetableService } from '../../../Services/studenttimetable.service';
import { LoginService } from '../../../Services/login.service';
import { StudentRegistrationService } from '../../../Services/student-registration.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, RouterOutlet, CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  enrollmentNo!: number|null;
  sectionId!: number;
  timetableService = inject(StudenttimetableService);
  loginService = inject(LoginService);
  regService = inject(StudentRegistrationService);

  subjectService = inject(StudentCourseService);
  students: any[] = []
  Subjects: any[] = [];

  getStudentByEnrollmentNumber(enrollmentNo: number) {
    this.regService.getStudentByStudentID(enrollmentNo).subscribe((result: any) => {
      this.students = result;
      this.sectionId = result.sectionId;
      this.getAllSubjectsBySectionId(this.sectionId);
      console.log("Here sectionId is", this.sectionId);
      console.log(this.students);
    })
  }
  getAllSubjectsBySectionId(id: number) {
    this.subjectService.getSubjectBySectionId(id).subscribe((res: any) => {
      this.Subjects = res;
      console.log(this.Subjects);
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
