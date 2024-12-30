import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from 'node:console';

@Component({
  selector: 'app-student-attendence',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './student-attendence.component.html',
  styleUrls: ['./student-attendence.component.css']
})
export class StudentAttendenceComponent implements OnInit {

  toastr = inject(ToastrService);
  SectionId!: number;
  
  showDateInput: boolean = false;
  isEditMode: boolean = false;
  isDateVisible: boolean = true
  attendenceForm: FormGroup;
  students: any[] = [];
  attendanceDate: string = new Date().toISOString().split('T')[0];
  selectedAttendanceDate: string = this.attendanceDate;


  // form status for attendance that will send to api for post amopping

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.attendenceForm = this.fb.group({
      attendanceDate: [this.attendanceDate, Validators.required],
      AttendenceRecords: this.fb.array([])
    });
  }


  // getter for AttendanceRecoeds array

  get AttendenceRecords(): FormArray {
    return this.attendenceForm.get('AttendenceRecords') as FormArray;
  }

  // initial form status

  addAttendenceRecord(student: any) {
    const attendenceRecord = this.fb.group({
      attendanceId: [0],
      studentName: [student.studentName],
      enrollmentNumber: [student.enrollmentNumber, Validators.required],
      sectionId: [this.SectionId, Validators.required],
      attendanceDate: [this.attendanceDate, Validators.required],
      isPresent: [true, Validators.required],
      imagepath:[student.imagePath]
    });
    this.AttendenceRecords.push(attendenceRecord);
  }

  // loading student data from database( get mapping)

  studentDetail:any

  loadStudentsBySectionId(sectionId: number) {
    this.http.get(`https://localhost:7262/GetStudentsBySectionID/${sectionId}`).subscribe(
      (res: any) => {
        this.studentDetail=res[0];
        // console.log(this.studentDetail)
        this.students = res;
        this.populateFormWithStudents(res);
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  // providing student data to initial form status

  populateFormWithStudents(students: any[]) {
    students.forEach((student) => {
      this.addAttendenceRecord(student);
    });
  }

  // inserting the form or add code starts here( post mapping)

  insertStudentAttendance() {
    if (this.attendenceForm.valid) {
      const payload = {
        SectionId: this.SectionId,
        AttendanceDate: this.attendenceForm.get('attendanceDate')?.value,
        AttendanceRecords: this.AttendenceRecords.value
      };
      this.http.post('https://localhost:7262/TakeAttendanceByDate', payload).subscribe(
        (response: any) => {

          alert(response.message);
          this.resetForm();
        },
        (error: HttpErrorResponse) => {
          if (error.status === 409 && error.error?.existingAttendance) {
            alert(error.error.message);
            this.patchExistingAttendance(error.error.existingAttendance);
            this.isEditMode = false
          } else {
            console.error('Error submitting attendance:', error);
            alert('An unexpected error occurred.');
          }
        }
      );
    }
  }

  // submitting the form

  submitAttendance() {
    if (this.isEditMode == false) {
      this.insertStudentAttendance();
    }
    else {
      this.updateStudentAttendance()
    }

  }


  // patching the value on form for updation and for conflict status 409

  patchExistingAttendance(existingAttendance: any[]) {
    this.AttendenceRecords.clear();
    this.isDateVisible = false;
    this.isEditMode = true;
    existingAttendance.forEach((record) => {
      const student = this.students.find(
        (s) => s.enrollmentNumber === record.enrollmentNumber,
      );
      const attendanceRecord = this.fb.group({
        attendanceId: [record.attendanceId],
        studentName: [student?.studentName || 'Unknown'],
        enrollmentNumber: [record.enrollmentNumber, Validators.required],
        sectionId: [record.sectionId, Validators.required],
        attendanceDate: [record.attendanceDate],
        isPresent: [record.isPresent ?? true, Validators.required],
        imagepath:[student?.imagePath || 'Student Image']
      });

      this.AttendenceRecords.push(attendanceRecord);
    });
  }

 // reseting the form

  resetForm() {
    this.attendenceForm.reset();
    this.AttendenceRecords.clear();
    this.isEditMode = false;
    this.attendenceForm.patchValue({ attendanceDate: this.attendanceDate });
    this.loadStudentsBySectionId(this.SectionId)
  }

  // Edit Code Starts Here

  EditButton() {
    this.resetForm();
    this.showDateInput = true;
    this.isDateVisible = false;
  }
  closeEdieButton() {
    this.showDateInput = false;
    this.isDateVisible = true;
  }


  // patching the value of student attence from database to form

  getAttendanceBySectionIdAndDate(SectionId: number, attendanceDate: string) {
    if (!SectionId || !attendanceDate) {
      alert('Section ID or Attendance Date is missing.');
      return;
    }
    this.http.get(`https://localhost:7262/GetAttendanceBySectionAndDate?sectionId=${SectionId}&attendanceDate=${attendanceDate}`)
      .subscribe((res: any) => {
        // console.log(res);
        if (res && res.length > 0) {
          this.patchExistingAttendance(res);
        }
      },
        (error: HttpErrorResponse) => {
          // console.log(error);
          if (error.status == 404) {
            alert("No attendance records found for the specified section and date.");
          }

        }
      )
  }


  // Edit Student Attendance (Put mapping)

  updateStudentAttendance() {
    this.http.put(`https://localhost:7262/UpdateStudentAttendance`, this.AttendenceRecords.value).subscribe((res: any) => {
      alert(res.message);
      this.showDateInput = false;
      this.isDateVisible = true;
      this.resetForm();
    })
  }


  // Routing from url for sectionId(grtting sectionid from url)

  route = inject(ActivatedRoute);
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.SectionId = +params['SectionId'];
      if (this.SectionId) {
        this.loadStudentsBySectionId(this.SectionId);
      } else {
        alert('Invalid Section ID');
      }
    });
  }
}
