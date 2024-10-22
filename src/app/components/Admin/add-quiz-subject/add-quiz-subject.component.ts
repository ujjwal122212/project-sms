import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeacherQuizService } from '../../../Services/teacher-quiz.service';

@Component({
  selector: 'app-add-quiz-subject',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './add-quiz-subject.component.html',
  styleUrl: './add-quiz-subject.component.css'
})
export class AddQuizSubjectComponent implements OnInit {
  quizform: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder) { }

  quizService = inject(TeacherQuizService);
  openform() {
    const stuform = document.getElementById('formModel');
    if (stuform != null) {
      stuform.classList.add('openform');
    }
  }
  CloseModel() {
    this.setquizformstate();
    this.selectedClass = 0;
    this.selectedSectionId = 0;
    this.Sections = [];
    const stuform = document.getElementById('formModel');
    if (stuform != null) {
      stuform.classList.remove('openform');
    }
  }
  setquizformstate() {
    this.quizform = this.fb.group({
      subjectId: [0],
      classId: [0],
      sectionId: [0],
      subjectName: ['', Validators.required],
      subjectCode: ['', Validators.required]
    })
  }
  Classes: any[] = [];
  Sections: any[] = [];
  Subjects: any[] = [];
  subjectHeading: string[] = ['S.NO', 'SubjectName', 'SubjectCode', 'Action'];
  loadClasses() {
    this.quizService.getClasses().subscribe((response: any) => {
      // console.log(response);
      this.Classes = response;
      console.log(this.Classes);
    })
  }
  selectedClass: number = 0;
  onClassChange(event: any) {
    this.selectedClass = event.target.value;
    this.quizform.patchValue({ sectionId: 0 });
    this.selectedSectionId = 0;
    this.Sections = [];
    this.Subjects = [];
    this.isSubjectDataEmpty = false;
    this.isCourseFound = false;
    this.loadSectionsByClassId(this.selectedClass);
  }
  loadSectionsByClassId(classId: number): void {
    this.quizService.getSectionByClassId(classId).subscribe((response: any) => {
      this.Sections = response;
      console.log(response);
    })
  }


  loadSubjectBySectionId(sectionId: number) {
    this.quizService.getQuizSubjectBySectionId(sectionId).subscribe((result: any) => {
      this.Subjects = result;
      console.log(this.Subjects);
      if (this.Subjects.length === 0) {
        this.isSubjectDataEmpty = true;
      }
    })
  }
  selectedSectionId: number = 0;
  onSectionChange(event: any) {
    this.selectedSectionId = event.target.value;
  }
  isCourseFound: boolean = false;
  isSubjectDataEmpty = false;
  showCourse() {
    this.isCourseFound = true;
    this.isSubjectDataEmpty = false;
    if (this.selectedSectionId) {
      this.loadSubjectBySectionId(this.selectedSectionId);
    } else {
      alert("Please select a Class and a section");
    }
  }
  insertQuizSubjects() {
    if (this.quizform.invalid) {
      alert("Please fill Valid Details");
      return;
    }
    else {
      const formvalue = this.quizform.value;
      this.quizService.AddQuizSubjects(formvalue).subscribe((res: any) => {
        alert("Quiz Subjects Added Successfully");
        this.quizform.reset();
        this.CloseModel();
        this.selectedClass = 0;
        this.selectedSectionId = 0;
        // this.Sections = [];
        // this.Subjects = [];
      })
    }
  }
  onSubmit() {
    this.insertQuizSubjects();
  }
  deleteQuizSubject(subjectId: number) {
    const isConfirm = confirm("Are you sure to want to delete this record ?");
    if (isConfirm) {
      this.quizService.deleteQuizSubject(subjectId).subscribe((res: any) => {
        alert("Quiz Subject Data Deleted Successfully");
        this.selectedClass = 0;
        this.selectedSectionId = 0;
        this.Sections = [];
        this.Subjects = [];
      })
    }
  }
  ngOnInit(): void {
    this.setquizformstate();
    this.loadClasses();
  }
}
