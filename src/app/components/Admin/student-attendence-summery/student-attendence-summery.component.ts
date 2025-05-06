import { Component, inject, OnInit } from '@angular/core';
import { StudentRegistrationService } from '../../../Services/student-registration.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-attendence-summery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-attendence-summery.component.html',
  styleUrl: './student-attendence-summery.component.css'
})
export class StudentAttendenceSummeryComponent implements OnInit {
  regService = inject(StudentRegistrationService);
  Classes: any[] = [];
  selectedClass: number = 0;
  selectedSectionId: number = 0;
  selectedDate: String = '';
  Sections: any[] = [];
  StudentRecords: any[] = [];
  enrollmentNumber: number = 0;
  http = inject(HttpClient);
  loadClasses() {
    this.regService.getClasses().subscribe((res: any) => {
      this.Classes = res;
    });
  }
  onClassChange(event: any) {
    this.selectedClass = event.target.value;
    this.selectedSectionId = 0;
    this.Sections = [];
    this.loadSectionsByClassId(this.selectedClass);
  }

  loadSectionsByClassId(classId: number): void {
    this.regService.getSectionByClassId(classId).subscribe((response: any) => {
      this.Sections = response;
      // console.log("Section Object", response);
    });
  }
  onSectionChange(event: any) {
    this.selectedSectionId = event.target.value;
  }
  loadAttendenceRecordBySectionAndDate() {
    const url = `https://localhost:7262/Admin/GetSectionAttendanceByDate?sectionId=${this.selectedSectionId}&date=${this.selectedDate}`;
    this.http.get(url).subscribe((res: any) => {
      if (!res || res.length === 0) {
        alert("No attendance records found for the selected section and date.");
        return;
      }

      this.StudentRecords = res;

      this.StudentRecords.forEach((record, index) => {
        this.loadStudentByEnrollmentNumber(record.enrollmentNumber, index);
      });
    }, error => {
      console.error("Error fetching attendance records:", error);
      alert("Failed to load attendance records. Please try again later.");
    });
  }

  loadStudentByEnrollmentNumber(enrollmentNumber: number, index: number) {
    this.http.get(`https://localhost:7262/GetStudentByIdAllDetails/${enrollmentNumber}`)
      .subscribe((res: any) => {
        this.StudentRecords[index].studentName = res.studentName;
      });
  }

  showDetails() {
    if (this.selectedClass === 0) {
      alert("Please select a class.");
      return;
    }

    if (this.selectedSectionId === 0) {
      alert("Please select a section.");
      return;
    }

    if (!this.selectedDate) {
      alert("Please select a date.");
      return;
    }

    this.StudentRecords = []; // Clear previous records

    this.loadAttendenceRecordBySectionAndDate();
  }

  ngOnInit(): void {
    this.loadClasses();
  }
}
