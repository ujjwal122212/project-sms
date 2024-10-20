import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentRegistrationService } from '../../../Services/student-registration.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, concatMap, map, Observable, of, tap } from 'rxjs';
import { admission } from '../../../Interfaces/Admission';
import { response } from 'express';

@Component({
  selector: 'app-view-student-admission',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './view-student-admission.component.html',
  styleUrl: './view-student-admission.component.css'
})
export class ViewStudentAdmissionComponent implements OnInit {
  route = inject(Router);
  reService = inject(StudentRegistrationService);

  Classes: any[] = [];
  Sections: any[] = [];
  Students: any[] = [];
  isSubjectDataEmpty = false;
  isCourseFound = false;
  isClassOrSectionNotSelected = false;

  selectedClass: number = 0;
  selectedSectionId: number = 0;

  StudentHeading: string[] = ['S.NO', 'StudentName', 'D.O.B', 'Gender', 'BloodGroup', 'Fathers Name',
    'Mothers Name', 'Fathers Occupation', 'Mothers Occupation', 'Family Income', 'MobileNo', 'EmailId',
    'State', 'District', 'PinCode', 'Address', 'Student Photo', 'Class', 'Section', 'Password', 'EnrollmentDate', 'Action'];



  openregform() {
    this.route.navigateByUrl('/StuAdmission');
  }

  loadClasses() {
    this.reService.getClasses().subscribe((response: any) => {
      this.Classes = response;
      console.log('Class Object', this.Classes);
    });
  }

  onClassChange(event: any) {
    this.selectedClass = event.target.value;
    this.selectedSectionId = 0;
    this.Sections = [];
    this.Students = [];
    this.isSubjectDataEmpty = false;
    this.isCourseFound = false;
    this.isClassOrSectionNotSelected = false;
    this.loadSectionsByClassId(this.selectedClass);
  }

  loadSectionsByClassId(classId: number): void {
    this.reService.getSectionByClassId(classId).subscribe((response: any) => {
      this.Sections = response;
      console.log("Section Object", response);
    });
  }

  loadStudentDetailsBySectionId(sectionId: number) {
    this.reService.getStudentsBySectionID(sectionId).pipe(
      catchError(error => {
        console.error('Error loading student details:', error);
        this.isSubjectDataEmpty = true; 
        return of([]);
      })
    ).subscribe((result: any) => {
      this.Students = result;
      console.log(this.Students);
      this.isSubjectDataEmpty = this.Students.length === 0;
    });
  }

  onSectionChange(event: any) {
    this.selectedSectionId = event.target.value;
    this.isClassOrSectionNotSelected = false;
  }

  showCourse() {
    this.isCourseFound = true;
    this.isSubjectDataEmpty = false;
    if (this.selectedClass === 0 || this.selectedSectionId === 0) {
      this.isClassOrSectionNotSelected = true;
      alert("Please select a class and a Section");
      return;
    }

    this.loadStudentDetailsBySectionId(this.selectedSectionId);
  }

  deleteStudentbyid(studentID: number) {
    const isConfirm = confirm("Are you sure to want to delete this record ? ");
    if (isConfirm) {
      this.reService.deleteStudentByStudentId(studentID).subscribe((res: any) => {
        alert("Student data deleted successfully");
        this.selectedClass = 0;
        this.selectedSectionId = 0;
        this.Sections = [];
        this.Students = [];
      })
    }
  }
  EditStudent(studentID: number) {
    this.route.navigateByUrl('/StuAdmission/' + studentID);
  }
  ngOnInit(): void {
    this.loadClasses();
  }
}


