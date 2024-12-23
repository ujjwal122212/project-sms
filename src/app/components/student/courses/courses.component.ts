import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentCourseService } from '../../../Services/student-course.service';
import { CommonModule } from '@angular/common';
import { StudenttimetableService } from '../../../Services/studenttimetable.service';
import { LoginService } from '../../../Services/login.service';
import { StudentRegistrationService } from '../../../Services/student-registration.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  enrollmentNo!: number | null;
  sectionId!: number;
  classId!: number;
  timetableService = inject(StudenttimetableService);
  loginService = inject(LoginService);
  regService = inject(StudentRegistrationService);

  subjectService = inject(StudentCourseService);
  students: any[] = [];

  getStudentByEnrollmentNumber(enrollmentNo: number) {
    this.regService.getStudentByStudentID(enrollmentNo).subscribe((result: any) => {
      this.students = result;
      this.classId = result.class;
      this.getAllSubjectByClassId(this.classId);
    })
  }
  http = inject(HttpClient);
  course: any[] = []
  getAllSubjectByClassId(classId: number) {
    this.http.get(`https://localhost:7262/api/Subject/${classId}`).subscribe((response: any) => {
      this.course = response;
    })
  }
  route = inject(Router);
  goto(subjectId: number) {
    this.route.navigate(['studentlayout/courses/coursecontent'], {
      queryParams: { subjectId: subjectId },
    });
  }
  ngOnInit(): void {
    this.enrollmentNo = this.loginService.enrollmentNumber;
    if (this.enrollmentNo) {
      // console.log('Login Enrollment Number:', this.enrollmentNo);
      this.getStudentByEnrollmentNumber(this.enrollmentNo);
    }
  }
}
