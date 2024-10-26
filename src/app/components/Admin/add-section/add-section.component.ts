import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StudentCourseService } from '../../../Services/student-course.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-section',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './add-section.component.html',
  styleUrl: './add-section.component.css',
})
export class AddSectionComponent {
  toastr = inject(ToastrService);
  sectionForm: FormGroup = new FormGroup({});
  studentCourseService = inject(StudentCourseService);
  classes: any[] = [];
  sections: any[] = [];
  Table: any[] = [];
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadClasses();
    this.setsectionformstate();
  }

  loadClasses() {
    this.studentCourseService.getClasses().subscribe((response: any) => {
      this.classes = response;
      console.log(this.classes);
    });
  }

  Sectionform: FormGroup = new FormGroup({});
  setsectionformstate() {
    this.Sectionform = this.fb.group({
      sectionId: [0],
      classId: [0],
      sectionName: ['', Validators.required],
    });
  }

  insertSections() {
    if (this.Sectionform.invalid) {
      alert('Please fill all the valid details');
      return;
    }
    const formValue = this.Sectionform.value;
    this.http
      .post('https://localhost:7262/Add Sections', formValue)
      .subscribe(() => {
        alert('Section added successfully');
        this.Sectionform.reset();
        this.closeModel();
      });
  }

  addSection(): void {
    if (this.Sectionform.value.sectionId == 0) {
      this.insertSections();
    } else if (this.Sectionform.value.sectionId > 0) {
      this.EditSection();
    }
  }

  EditSection() {
    if (this.Sectionform.invalid) {
      alert('Please fill all the valid details');
      return;
    }
    const formValue = this.Sectionform.value;
    this.http
      .put(`https://localhost:7262/${formValue.sectionId}`, formValue)
      .subscribe(() => {
        alert('Section updated successfully');
        this.Sectionform.reset();
        this.closeModel();
      });
  }

  loadSectionsByClassId(classId: number): void {
    this.http
      .get(`https://localhost:7262/${classId}`)
      .subscribe((response: any) => {
        this.sections = response;
        if (this.sections.length === 0) {
          this.isSectionPresent = true;
        }

        console.log(response);
      });
  }

  selectedClass: any = 0;
  selectedSectionId: number = 0;
  isSectionPresent = false;

  showSection() {
    if (this.selectedClass) {
      this.loadSectionsByClassId(this.selectedClass);
    } else {
      alert('Please select a Class and a section');
    }
  }

  deleteSection(id: number) {
    const isConfirm = confirm('Are you sure you want to delete the Section ?');
    if (isConfirm) {
      this.http.delete(`https://localhost:7262/${id}`).subscribe(
        (res: any) => {
          alert('Section Deleted Successfully');
          this.selectedClass = 0;
        },
        (error) => {
          console.error('Error deleting section:', error);
          alert('Failed to delete the section. Please try again.');
        }
      );
    }
  }

  updateSection(id: number) {
    this.openForm();
    this.http.get(`https://localhost:7262/row/${id}`).subscribe(
      (res: any) => {
        console.log(res);
        this.Sectionform.patchValue({
          sectionId: res.sectionId,
          classId: res.classId,
          sectionName: res.sectionName,
        });
      },
      (error) => {
        console.error('Error updating section:', error);
      }
    );
  }

  openForm(): void {
    const formElement = document.getElementById('formModels');
    if (formElement) {
      formElement.classList.add('openform');
    }
  }
  closeModel(): void {
    this.setsectionformstate();
    const formElement = document.getElementById('formModels');
    if (formElement) {
      formElement.classList.remove('openform');
    }
  }
}
