import { CommonModule } from '@angular/common';

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeacherQuizService } from '../../../../Services/teacher-quiz.service';


@Component({
  selector: 'app-sechedule',
  standalone: true,

  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './sechedule.component.html',
  styleUrl: './sechedule.component.css'
})
export class SecheduleComponent implements OnInit {
  quizform: FormGroup = new FormGroup({});
  quizTitleForm: FormGroup = new FormGroup({});
  questionForm: FormGroup = new FormGroup({});
  questionOptionsForm: FormGroup = new FormGroup({});
  showTitle: boolean = false;
  isavailable: boolean = false;
  constructor(private fb: FormBuilder) { }

  quizService = inject(TeacherQuizService);
  Classes: any[] = [];
  Sections: any[] = [];
  QuizSubject: any[] = [];
  titleHeading: string[] = ['S.No', 'QuizTitle', 'QuizDescription', 'Action'];
  openform() {
    const stuform = document.getElementById('formModel');
    if (stuform != null) {
      stuform.classList.add('openform');
    }
  }
  CloseModel() {
    this.setquizformState();
    this.Sections = [];
    const stuform = document.getElementById('formModel');
    if (stuform != null) {
      stuform.classList.remove('openform');
    }
  }

  loadClass() {
    this.quizService.getClasses().subscribe((res: any) => {
      this.Classes = res;
      // console.log(this.Classes);
    })
  }
  selectedClassId: number = 0;
  onClassChange(event: any) {
    this.selectedClassId = event.target.value;
    this.quizform.patchValue({ sectionId: 0 });
    this.quizTitleForm.patchValue({
      sectionId: 0,
      subjectId: 0
    });
    this.questionForm.patchValue({
      sectionId: 0,
      subjectId: 0,
      quizID: 0
    })
    this.questionOptionsForm.patchValue({
      sectionId: 0,
      subjectId: 0,
      quizID: 0,
      questionID: 0
    })
    this.Sections = [];
    this.QuizSubject = [];
    this.loadSectionByClassId(this.selectedClassId);
  }
  loadSectionByClassId(classId: number) {
    this.quizService.getSectionByClassId(classId).subscribe((res: any) => {
      this.Sections = res;
      // console.log(this.Sections);
    })
  }


  setquizformState() {
    this.quizform = this.fb.group({
      subjectId: [0],
      classId: [0],
      sectionId: [0],
      subjectName: ['', Validators.required],
      subjectCode: ['', Validators.required]
    })
  }

  // adding quiz title and description by subject id

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
        this.Sections = [];
        this.CloseModel();
      })
    }
  }
  onSubmit() {
    this.insertQuizSubjects();
  }
  openQuizTitleForm() {
    const stuform = document.getElementById('quizTitleForm');
    if (stuform != null) {
      stuform.classList.add('openform');
    }
  }
  closeQuizTitleForm() {
    this.selectedClassId = 0;
    this.selectedSectionId = 0;
    this.selectedSubjectId = 0;
    this.setQuizTitleAndDesState();
    this.Sections = [];
    this.QuizSubject = [];
    this.quizTitle = [];
    const stuform = document.getElementById('quizTitleForm');
    if (stuform != null) {
      stuform.classList.remove('openform');
    }
  }


  setQuizTitleAndDesState() {
    this.quizTitleForm = this.fb.group({
      quizID: [0],
      classId: [0],
      sectionId: [0],
      subjectId: [0],
      quizTitle: ['', Validators.required],
      quizDescription: ['', Validators.required]
    })
  }
  loadSubjectBySectionId(SectionId: number) {
    this.quizService.getQuizSubjectBySectionId(SectionId).subscribe((res: any) => {
      this.QuizSubject = res;
    })
  }
  selectedSectionId: number = 0;
  onSectionChange(event: any) {
    this.selectedSectionId = event.target.value;
    this.loadSubjectBySectionId(this.selectedSectionId);
  }
  insertQuizTitleAndDescription() {
    if (this.quizTitleForm.invalid) {
      alert("Please fill all valid details");
      return;
    }
    const formvalue = this.quizTitleForm.value;
    this.quizService.AddQuizTitleAndDescription(formvalue).subscribe((res: any) => {
      alert("Quiz Title and Description Added Successfully");
      this.quizTitleForm.reset();
      this.closeQuizTitleForm();
    })
  }
  onSubmit1() {
    if (this.quizTitleForm.value.quizID == 0) {
      this.insertQuizTitleAndDescription();
    }
    else{
      this.editQuizTitleAndDescription();
    }

  }

  // getting quiz title and description by subject id

  selectedSubjectId: number = 0;
  onSubjectChange(event: any) {
    this.selectedSubjectId = event.target.value;

  }
  quizTitle: any[] = [];
  loadQuizTitleBySubjectId(subjectId: number) {
    this.showTitle = true
    this.quizService.getquiztitlebysubjectid(subjectId).subscribe((res: any) => {
      this.isavailable=true;
      this.quizTitle = res;
      // console.log(res);
    })
  }
  selectClassSectionAndSubject: boolean = true;
  showQuizTitleAndDescription() {
    this.selectClassSectionAndSubject = false;
    this.loadQuizTitleBySubjectId(this.selectedSubjectId);
  }


  // getQuizTitleAndDescriptionByQuizID

  getQuizTitleAndDescription(quizID: number) {
    this.quizService.getQuizTitleAndDescription(quizID).subscribe((res: any) => {
      this.quizTitleForm.patchValue({
        quizID: res.quizID,
        classId: res.classId,
        sectionId: res.sectionId,
        subjectId: res.subjectId,
        quizTitle: res.quizTitle,
        quizDescription: res.quizDescription
      })
      this.openQuizTitleForm();
    })
  }

  // edit quiz title and description

  editQuizTitleAndDescription() {
    if (this.quizTitleForm.invalid) {
      alert("Please fill all valid details");
      return;
    }
    const formvalue = this.quizTitleForm.value;
    this.quizService.EditQuizTitleAndDescription(formvalue.quizID, formvalue).subscribe((res: any) => {
      alert("Quiz Title and Description Updated Successfully");
      this.quizTitleForm.reset();
      this.closeQuizTitleForm();
    })
  }


  // delete quiz title and description
  deleteQuizTitleAndDescription(quizID: number) {
    const isDelete = confirm("Are you sure you want to delete this Quiz?");
    if (isDelete) {
      this.quizService.deleteQuizTitleAndDescription(quizID).subscribe((res: any) => {
        alert("Quiz Deleted Successfully");
        this.closeQuizTitleForm();
      })
    }
  }

  ngOnInit(): void {
    this.setquizformState();
    this.setQuizTitleAndDesState();
    this.loadClass();
  }
}
