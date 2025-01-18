import { CommonModule } from '@angular/common';

import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  isQuiznotAvailable: boolean = true;
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
    else {
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
      this.isavailable = true;
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




  // Adding Questions And Options code starts here

  // Initializing form
  setQuestionFormState() {
    this.questionForm = this.fb.group({
      quizId: [0],
      classId: [0],
      sectionId: [0],
      subjectId: [0],
      questions: this.fb.array([])
    });
    this.addQuestion();
  }

  // Getting the questions FormArray
  get questions(): FormArray {
    return this.questionForm.get('questions') as FormArray;
  }

  // Add a new question group
  addQuestion() {
    const question = this.fb.group({
      questionId: [0],
      questionText: ['', Validators.required],
      options: this.fb.array([])
    });
    this.questions.push(question);
  }

  // Removing a question group by index
  removeQuestion(index: number) {
    if (this.questions.length > 1) {
      this.questions.removeAt(index);
    } else {
      alert('At least one question is required.');
    }
  }

  // Getting the options FormArray for a specific question
  getOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  // Mark the correct option for a question
  markCorrectOption(questionIndex: number, optionIndex: number): void {
    const options = this.getOptions(questionIndex);
    options.controls.forEach((control, index) => {
      control.get('isCorrect')?.setValue(index === optionIndex);
    });
  }

  // Adding a new option group to a specific question

  addOptions(questionIndex: number) {
    const options = this.fb.group({
      optionId: [0],
      optionText: ['', Validators.required],
      isCorrect: [false]
    });
    if (this.getOptions(questionIndex).length < 4) {
      this.getOptions(questionIndex).push(options);
    } else {
      alert('You can only add up to 4 options.');
    }
  }

  // Remove an option group by index for a specific question

  removeOption(questionIndex: number, optionIndex: number) {
    const options = this.getOptions(questionIndex);
    if (options.length > 1) {
      options.removeAt(optionIndex);
    }
    else {
      alert('At least one option is required.');
    }
  }

  quiZes: any[] = [];
  loadQuizBySubjectId(subjectId: number) {
    this.quizService.getquiztitlebysubjectid(subjectId).subscribe((res: any) => {
      this.quiZes = res;
    })
  }

  onSubjectChange1(event: any) {
    this.selectedSubjectId = event.target.value;
    this.loadQuizBySubjectId(this.selectedSubjectId);
  }

  insertQuestionOptions() {
    if (this.questionForm.invalid) {
      alert("Please fill all valid details");
      return;
    }
    const formvalue = this.questionForm.value;
    this.quizService.AddQuestions(formvalue).subscribe((res: any) => {
      alert(res.message);
      this.questionForm.reset();
      this.closeQuestionForm();
    })
  }

  onQuestionFormSubmit() {
    this.insertQuestionOptions();
  }


  // geeting all the question and options


  Classes1: any[] = [];
  loadClasses1() {
    this.quizService.getClasses().subscribe((res: any) => {
      this.Classes1 = res;
    })
  }

  selectedClassId1: number = 0;
  onClassChange1(event: any) {
    this.selectedClassId1 = event.target.value;
    this.loadSectionByClassId1(this.selectedClassId1);
  }
  Sections2: any[] = [];
  loadSectionByClassId1(classId: number) {
    this.quizService.getSectionByClassId(classId).subscribe((res: any) => {
      this.Sections2 = res;
    })
  }
  selectedSectionId1: number = 0;
  onSectionChange1(event: any) {
    this.selectedSectionId1 = event.target.value;
    this.loadSubjectBySectionId1(this.selectedSectionId1);
  }
  Subject1: any[] = [];
  loadSubjectBySectionId1(sectionId: number) {
    this.quizService.getQuizSubjectBySectionId(sectionId).subscribe((res: any) => {
      this.Subject1 = res;
    })
  }
  selectedSubjectId1: number = 0;

  onSubjectChange2(event: any) {
    this.selectedSubjectId1 = event.target.value;
    this.loadQuizBySubjectId1(this.selectedSubjectId1);
  }
  selectedQuizId: number = 0;
  onQuizChange(event: any) {
    this.selectedQuizId = event.target.value;
  }
  QuizDetails: any[] = [];
  loadQuizBySubjectId1(subjectId: number) {
    this.quizService.getquiztitlebysubjectid(subjectId).subscribe((res: any) => {
      this.QuizDetails = res;
      // console.log(res);
    })
  }

  // QuesTionAndOptions: any[] = [];
  // loadQuestionAndOptions(quizID: number) {
  //   this.quizService.getquestionbyquizid(quizID).subscribe((res: any) => {
  //     this.QuesTionAndOptions = res;
  //   })
  // }

  // itemsPerPage: number = 1;
  // currentPage: number = 1;

  // get pagedAttendanceRecords() {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   const endIndex = startIndex + this.itemsPerPage;
  //   return this.QuesTionAndOptions.slice(startIndex, endIndex);
  // }

  // changePage(page: number) {
  //   this.currentPage = page;
  // }



  QuesTionAndOptions: any[] = [];
  itemsPerPage: number = 1;
  currentPage: number = 1;

  paginatedQuestions: any[] = [];



  loadQuestionAndOptions(quizID: number) {
    this.quizService.getquestionbyquizid(quizID).subscribe((res: any) => {
      this.QuesTionAndOptions = res;
      // console.log(this.QuesTionAndOptions);
      this.paginateQuestions();
    });
  }

  // Function to paginate the questions
  paginateQuestions() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedQuestions = this.QuesTionAndOptions.slice(startIndex, endIndex);
  }

  // Function to handle page changes
  changePage(direction: string) {
    const totalPages = Math.ceil(this.QuesTionAndOptions.length / this.itemsPerPage);

    if (direction === 'next' && this.currentPage < totalPages) {
      this.currentPage++;
    } else if (direction === 'previous' && this.currentPage > 1) {
      this.currentPage--;
    }
    this.paginateQuestions();
  }

  // Getter for paginated questions
  get pagedQuestions() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.QuesTionAndOptions.slice(startIndex, endIndex);
  }

  showQuizQuestionAndOptions() {
    this.isQuiznotAvailable = false;
    if (this.selectedClassId1 == 0 || this.selectedSectionId1 == 0 || this.selectedSubjectId1 == 0 || this.selectedQuizId == 0) {
      alert("Please select all the fields");
      return;
    }
    this.loadQuestionAndOptions(this.selectedQuizId);
  }


  openQuestionForm() {
    const questionForm = document.getElementById('questionForm');
    if (questionForm != null) {
      questionForm.classList.add('openform');
    }
  }

  closeQuestionForm() {
    this.selectedClassId = 0;
    this.selectedSectionId = 0;
    this.selectedSubjectId = 0;
    this.Sections = [];
    this.QuizSubject = [];
    this.setQuestionFormState();
    const questionForm = document.getElementById('questionForm');
    if (questionForm != null) {
      questionForm.classList.remove('openform');
    }
  }


  editQuestion(questionId: number) {
    alert("Edit Question");
  }
  deleteQuestion(questionId: number) {
    alert("Delete Question");
  }

  ngOnInit(): void {
    this.setquizformState();
    this.setQuizTitleAndDesState();
    this.loadClass();
    this.setQuestionFormState();
    this.loadClasses1();
  }
}
