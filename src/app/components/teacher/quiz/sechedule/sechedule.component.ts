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
  constructor(private fb: FormBuilder) { }

  quizService = inject(TeacherQuizService);
  Classes: any[] = [];
  Sections: any[] = [];
  QuizSubject: any[] = [];
  titleHeading:string[]=['S.No','QuizTitle','QuizDescription','Action'];
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
      console.log(this.Classes);
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
      quizID:0
    })
    this.questionOptionsForm.patchValue({
      sectionId: 0,
      subjectId: 0,
      quizID:0,
      questionID:0
    })
    this.Sections = [];
    this.QuizSubject = [];
    this.quizArray=[];
    this.questions=[];
    this.loadSectionByClassId(this.selectedClassId);
  }
  loadSectionByClassId(classId: number) {
    this.quizService.getSectionByClassId(classId).subscribe((res: any) => {
      this.Sections = res;
      console.log(this.Sections);
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
    this.setQuizTitleAndDesState();
    this.Sections = [];
    this.QuizSubject = [];
    const stuform = document.getElementById('quizTitleForm');
    if (stuform != null) {
      stuform.classList.remove('openform');
    }
  }


  setQuizTitleAndDesState() {
    this.quizTitleForm = this.fb.group({
      quizId: [0],
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
    this.insertQuizTitleAndDescription();
  }

  openquestionform() {
    const stuform = document.getElementById('questionForm');
    if (stuform != null) {
      stuform.classList.add('openform');
    }
  }
  closequestionform() {
    this.setquestionformstate();
    const stuform = document.getElementById('questionForm');
    this.Sections = [];
    this.QuizSubject = [];
    this.quizArray=[];
    if (stuform != null) {
      stuform.classList.remove('openform');
    }
  }
  setquestionformstate() {
    this.questionForm = this.fb.group({
      questionID: [0],
      classId: [0],
      sectionId: [0],
      subjectId: [0],
      quizID: [0],
      questionText:['',Validators.required]
    })

  }
  selectSubjectId:number=0;
  onSubjectchange(event:any){
  this.selectSubjectId=event.target.value;
  this.loadQuizTitleBySubjectId(this.selectSubjectId);
  }
  quizArray: any[] = [];
  loadQuizTitleBySubjectId(subjectId: number) {
    this.quizService.getquiztitlebysubjectid(subjectId).subscribe((res: any) => {
      this.quizArray = res;
      console.log(this.quizArray);
    })
  }
  insertquestions(){
    if(this.questionForm.invalid){
      alert("please fill all valid details");
      return;
    }
    const formvalue=this.questionForm.value;
    this.quizService.AddQuestions(formvalue).subscribe((res:any)=>{
      alert("Question added Successfully");
      this.questionForm.reset();
      this.closequestionform();
    })
  }
  onSubmit2() {
   this.insertquestions();
  }
  openquestionoptionform(){
    const stuform = document.getElementById('questionoptionForm');
    if (stuform != null) {
      stuform.classList.add('openform');
    }
  }
  closequestionoptionform(){
    this.setquestionoptionformstate();
    this.Sections = [];
    this.QuizSubject = [];
    this.quizArray=[];
    this.questions=[];
    const stuform = document.getElementById('questionoptionForm');
    if (stuform != null) {
      stuform.classList.remove('openform');
    }
  }
  setquestionoptionformstate(){
    this.questionOptionsForm=this.fb.group({
      optionID: [0],
      classId: [0],
      sectionId: [0],
      subjectId: [0],
      quizID: [0],
      questionID:[0],
      optionText:['',Validators.required],
      isCorrect:['',Validators.required]
    })
  }
  onQuizChange(event:any){
    this.selectedQuizId=event.target.value;
    this.loadQuestionsByQuizID(this.selectedQuizId);
  }
  questions:any[]=[];
  selectedQuizId:number=0;
  loadQuestionsByQuizID(quizID:number){
    this.quizService.getquestionbyquizid(quizID).subscribe((res:any)=>{
      this.questions=res;
      console.log(this.questions);
    })
  }
  insertquestionoption(){
    if(this.questionOptionsForm.invalid){
      alert("please fill all valid details");
      return;
    }
    const formvalue=this.questionOptionsForm.value;
    this.quizService.addquestionoption(formvalue).subscribe((res:any)=>{
      alert("Question Option added Successfully");
      this.questionOptionsForm.reset();
      this.closequestionoptionform();
    })
  }
  onSubmit3(){
    this.insertquestionoption();
  }
  ngOnInit(): void {
    this.setquizformState();
    this.setQuizTitleAndDesState();
    this.setquestionformstate();
    this.setquestionoptionformstate();
    this.loadClass();
    this.loadQuizTitleBySubjectId(1);
  }
}
