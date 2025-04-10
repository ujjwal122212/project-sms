import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentRegistrationService } from '../../../../Services/student-registration.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError, concatMap, map, Observable, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-view-all-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-all-student.component.html',
  styleUrl: './view-all-student.component.css',
})
export class ViewAllStudentComponent implements OnInit {
  toastr = inject(ToastrService);
  route = inject(Router);
  constructor(private http: HttpClient) {}

  Students: any[] = [];
  isSubjectDataEmpty = false;
  isCourseFound = false;
  isClassOrSectionNotSelected = false;

  searchTerm: string = '';

  StudentHeading: string[] = [
    'S.NO',
    'Enrollment No',
    // 'Student Photo',
    'StudentName',
    'D.O.B',
    'Gender',
    'BloodGroup',
    'Fathers Name',
    'Mothers Name',
    'MobileNo',
    'EmailId',
    'State',
    'District',
    'PinCode',
    'Address',
    'Class',
    // 'Section',
    'Action',
  ];

  openregform() {
    this.route.navigateByUrl('/adminlayout/StuAdmission');
  }

  getAllStudents() {
    this.http.get<any[]>('https://localhost:7262/GetAllStudents').subscribe(
      (response) => {
        this.Students = response.sort(
          (a, b) => b.enrollmentNumber - a.enrollmentNumber
        );
      },
      (error) => {
        console.error('Error fetching students');
      }
    );
  }

  FeesStudent(enrollmentNumber: number) {
    console.log(enrollmentNumber);
  }
  admissionDetail(enrollmentNumber: number) {
    console.log(enrollmentNumber);
  }
  get filteredUserList() {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    return this.Students.filter(
      (student) =>
        student.enrollmentNumber
          .toString()
          .toLowerCase()
          .includes(lowerCaseSearchTerm) ||
        student.studentName.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }

  trackByEnrollmentNumber(index: number, student: any): number {
    return student.enrollmentNumber;
  }
  GOTO() {
    this.route.navigateByUrl('/adminlayout/viewstudentadmission');
  }

  ngOnInit(): void {
    this.getAllStudents();
  }
}
