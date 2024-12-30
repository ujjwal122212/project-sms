import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-class-teacher-assignment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './class-teacher-assignment.component.html',
  styleUrl: './class-teacher-assignment.component.css',
})
export class ClassTeacherAssignmentComponent implements OnInit {
  Classes: any[] = [];
  Sections: any[] = [];
  Teachers: any[] = [];
  Data: any[] = [];
  filteredData: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  classTeacherAssignmentForm: FormGroup = new FormGroup({});
  http = inject(HttpClient);

  constructor(private fb: FormBuilder) { }

  setformState() {
    this.classTeacherAssignmentForm = this.fb.group({
      classId: ['', Validators.required],
      sectionId: ['', Validators.required],
      enrollmentNumber: ['', Validators.required],
      assignmentID: [0],
    });
  }

  ngOnInit(): void {
    this.loadClass();
    this.showClassTeacherAssignment();
    this.setformState();
  }

  loadClass() {
    this.http.get('https://localhost:7262/Classes').subscribe((res: any) => {
      this.Classes = res;
    });
  }

  selectedClass: number = 0;
  onClassChange(event: any) {
    this.selectedClass = event.target.value;
    this.loadSectionByClassId(this.selectedClass);
  }

  loadSectionByClassId(classId: number) {
    this.http.get(`https://localhost:7262/${classId}`).subscribe((res: any) => {
      this.Sections = res;
    });
  }

  selectedSection: number = 0;
  onSectionChange(event: any) {
    this.selectedSection = event.target.value;
    this.loadTeacher();
  }

  loadTeacher() {
    this.http.get('https://localhost:7262/api/Teacher/GetTeachers').subscribe(
      (res: any) => {
        this.Teachers = res;
      },
      (err) => {
        alert('Error loading teachers');
      }
    );
  }

  getAllClassTeacher() {
    this.http
      .get('https://localhost:7262/ClassTeacherAssignment/GetALLClassTeachers')
      .subscribe(
        (res: any) => {
          this.Data = res;
          this.filteredData = res;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // Fill
  filterTeachers() {
    if (this.searchTerm.trim() === '') {
      this.filteredData = this.Data;
    } else {
      this.filteredData = this.Data.filter((item) =>
        item.Name?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  onSubmit() {
    if (this.classTeacherAssignmentForm.value.assignmentID == 0) {
      this.insertClassTeacherAssignment();
    } else if (this.classTeacherAssignmentForm.value.assignmentID > 0) {
      this.updateClassTeacherAssignment();
    }
  }

  insertClassTeacherAssignment() {
    if (this.classTeacherAssignmentForm.invalid) {
      alert('Please fill valid details');
      return;
    }
    const { classId, sectionId, enrollmentNumber } =
      this.classTeacherAssignmentForm.value;

    if (!enrollmentNumber) {
      alert('Please select a teacher');
      return;
    }
    const formValue = { classId, sectionId, teacherId: enrollmentNumber };
    this.http
      .post('https://localhost:7262/ClassTeacherAssignment/Add', formValue)
      .subscribe(
        (res: any) => {
          alert(res.message);
          this.resetForm();
          this.CloseModel();
          this.getAllClassTeacher();
        },
        (error) => {
          alert(error.error.message);
          this.resetForm();
          this.CloseModel();
        }
      );
  }

  deleteClassTeacherAssignment(asignID: number) {
    if (confirm('Are you sure you want to delete this assignment?')) {
      this.http
        .delete(
          `https://localhost:7262/ClassTeacherAssignment/Delete/${asignID}`
        )
        .subscribe(
          (res: any) => {
            alert('Assignment deleted successfully');
            this.selectedClass = 0;
            this.selectedSection = 0;
            this.getAllClassTeacher();
          },
          (error) => {
            console.error('Error deleting assignment', error);
          }
        );
    }
  }

  editClassTeacherAssignment(asignID: number) {
    this.http
      .get(`https://localhost:7262/ClassTeacherAssignment/GetById/${asignID}`)
      .subscribe(
        (res: any) => {
          if (res) {
            console.log(res);
            this.onClassChange({target:{value:res.classId}});
            this.onSectionChange({target:{value:res.sectionId}});
            this.classTeacherAssignmentForm.patchValue({
              classId: res.classId,
              sectionId: res.sectionId,
              enrollmentNumber: res.teacherId,
              assignmentID: res.assignmentID,
            });
          } else {
            alert('Assignment not found.');
          }
        },
        (error) => {
          alert('Error fetching assignment data.');
        }
      );
    this.openform(); // Open the form modal
  }

  updateClassTeacherAssignment() {
    if (this.classTeacherAssignmentForm.invalid) {
      alert('Please fill all the valid details');
      return;
    }

    const AssignmentID = this.classTeacherAssignmentForm.value.assignmentID;
    const formData = {
      classId: this.classTeacherAssignmentForm.value.classId,
      sectionId: this.classTeacherAssignmentForm.value.sectionId,
      teacherId: this.classTeacherAssignmentForm.value.enrollmentNumber,
    };

    this.http
      .put(
        `https://localhost:7262/ClassTeacherAssignment/Update/${AssignmentID}`,
        formData
      )
      .subscribe(
        (res: any) => {
          alert('Class Teacher Assignment updated successfully');
          this.selectedClass = 0;
          this.selectedSection = 0;

          this.resetForm();
          this.CloseModel();
          this.getAllClassTeacher();
        },
        (error) => {
          alert('Error updating assignment');
        }
      );
  }

  showClassTeacherAssignment() {
    this.getAllClassTeacher();
  }

  resetForm() {
    this.classTeacherAssignmentForm.reset();
  }

  openform() {
    const stuform = document.getElementById('formModel');
    if (stuform != null) {
      stuform.classList.add('openform');
    }
  }

  CloseModel() {
    this.setformState();
    const stuform = document.getElementById('formModel');
    if (stuform != null) {
      stuform.classList.remove('openform');
    }
  }

  // Pagination logic
  get paginatedClasses() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredData.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.filteredData.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
