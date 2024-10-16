import { Component, inject, OnInit } from '@angular/core';
import { StudentCourseService } from '../../../Services/student-course.service';
import { response } from 'express';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-student-course',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,FormsModule],
  templateUrl: './add-student-course.component.html',
  styleUrl: './add-student-course.component.css'
})
export class AddStudentCourseComponent implements OnInit {
  toastr = inject(ToastrService);
  courseForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder) { }
  studentCourseService = inject(StudentCourseService);
  openform() {
    const stuform = document.getElementById('formModel');
    if (stuform != null) {
      stuform.classList.add('openform');
    }
  }
  CloseModel() {
    this.setformstate();
    const stuform = document.getElementById('formModel');
    if (stuform != null) {
      stuform.classList.remove('openform');
    }
  }
  Classes: any[] = [];
  Sections: any[] = [];
  Subjects: any[] = [];
  // SubjectArray:string[]=['Math','Hindi','English','Social Science','Science','Computer Science','Sanskrit','Urdu'];
  // CourseCodeArray:string[]=['001','002','003','004','005','006','007','008','009','010'];
  subjectHeading: string[] = ['S.NO', 'SubjectName', 'SubjectCode', 'Action'];
  loadClasses() {
    this.studentCourseService.getClasses().subscribe((response: any) => {
      // console.log(response);
      this.Classes = response;
      console.log(this.Classes);
    })
  }
  selectedClass: number=0;
  onClassChange(event: any) {
    this.selectedClass = event.target.value;
    this.selectedSectionId=0;
    this.Subjects=[];
    this.isSubjectDataEmpty=false;
    this.isCourseFound=false;
    this.loadSectionsByClassId(this.selectedClass);
  }
  loadSectionsByClassId(classId: number): void {
    this.studentCourseService.getSectionByClassId(classId).subscribe((response: any) => {
      this.Sections = response;
      console.log(response);
    })
  }


  loadSubjectBySectionId(sectionId: number) {
    this.studentCourseService.getSubjectBySectionId(sectionId).subscribe((result: any) => {
      this.Subjects = result;
      if (this.Subjects.length === 0) {
        this.isSubjectDataEmpty = true;
      }
    })
  }
  selectedSectionId: number=0;
  onSectionChange(event: any) {
    this.selectedSectionId = event.target.value;
  }
  isCourseFound:boolean=false;
  isSubjectDataEmpty = false;
  showCourse() {
    this.isCourseFound=true;
    this.isSubjectDataEmpty=false;
    if (this.selectedSectionId) {
      this.loadSubjectBySectionId(this.selectedSectionId);
    } else {
      alert("Please select a section");
    }
  }
  setformstate() {
    this.courseForm = this.fb.group({
      subjectId: [0],
      classId: ['', Validators.required],
      sectionId: ['', Validators.required],
      subjectName: ['', Validators.required],
      subjectCode: ['', Validators.required]
    })
  }
  insertSubjects() {
    if (this.courseForm.invalid) {
      alert("Please fill all the valid details");
      return;
    }
    const formValue = this.courseForm.value;
    this.studentCourseService.addSubjects(formValue).subscribe((result: any) => {
      alert("Course Added Successfully");
      // this.toastr.success('Student Added Succesfully');
      // this.loadSubjectBySectionId(formValue.sectionId);
      this.courseForm.reset();
      this.CloseModel();
    })
  }
  onSubmit() {
    console.log(this.courseForm.value);
    this.insertSubjects();
  }
  ngOnInit(): void {
    this.setformstate();
    this.loadClasses();
    // this.loadSubjectBySectionId(1);
  }

}
