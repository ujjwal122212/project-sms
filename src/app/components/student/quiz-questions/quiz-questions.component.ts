import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-quiz-questions',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, ReactiveFormsModule],
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.css'], // Fixed `styleUrls`
})
export class QuizQuestionsComponent implements OnInit {
  isloading: boolean = true;
  isEmpty: boolean = true;
  quizId!: number;
  subjectCode!: string;
  quizDetails: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 1;
  totalPages = 1;
  route = inject(ActivatedRoute);
  http = inject(HttpClient);

  constructor(private fb: FormBuilder) { }

  getQuestionsAndOptionsByQuizId(quizId: number) {
    this.isloading = true;

    this.http.get(`https://localhost:7262/api/QuizSubject/GetQuizDetailsWithQuestions/${quizId}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching quiz details:', error);
          this.isloading = false;
          this.isEmpty = true;
          this.quizDetails = {};
          if (error.status === 404) {
            alert('No data found');
          }
          return throwError(() => error);
        })
      )
      .subscribe((res: any) => {
        this.quizDetails = res;
        this.isloading = false;
        this.isEmpty = !res || !res.questions || res.questions.length === 0;
        this.totalPages = this.isEmpty ? 0 : Math.ceil(this.quizDetails.questions.length / this.itemsPerPage);

        if (!this.isEmpty) {
          this.initializeForm();
        }
      });
  }

  // Initializing the form
  id = localStorage.getItem('Id');
  value = this.id ? parseInt(this.id, 10) : null;
  quizForm!: FormGroup;

  initializeForm() {
    if (!this.quizDetails.questions) return;

    this.quizForm = this.fb.group({
      enrollmentNumber: [this.value, Validators.required],
      quizID: [this.quizId, Validators.required],
      answers: this.fb.array([])
    });

    const answersArray = this.quizForm.get('answers') as FormArray;
    this.quizDetails.questions.forEach((question: any) => {
      answersArray.push(
        this.fb.group({
          answerID: [0],
          submissionID: [0],
          questionID: [question.questionId, Validators.required],
          selectedOptionID: [null, Validators.required],
          isCorrect: [false]
        })
      );
    });
  }

  submitQuiz() {
    if (this.quizForm.invalid) {
      alert('Please answer all questions before submitting.');
      return;
    }

    const submissionData = {
      ...this.quizForm.value,
      submissionID: 0,
      submissionDate: new Date().toISOString(),
      totalMarks: 0
    };

    this.http.post('https://localhost:7262/SubmitQuiz', submissionData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 409) {
            alert(error.error.message);
            this.quizForm.reset();
            this.currentPage = 1;
            return throwError(() => error);
          }
          console.error('Error submitting quiz:', error);
          alert('There was an error submitting your quiz. Please try again.');
          return throwError(() => error);
        })
      )
      .subscribe((res: any) => {
        alert(res.message);
        this.currentPage = 1;
        this.quizForm.reset();
      });
  }

  onOptionSelect(questionID: number, selectedOptionID: number) {
    const answersArray = this.quizForm.get('answers') as FormArray;
    const answerIndex = answersArray.controls.findIndex(
      (control) => control.get('questionID')?.value === questionID
    );

    if (answerIndex !== -1) {
      const answerGroup = answersArray.at(answerIndex) as FormGroup;
      answerGroup.patchValue({
        selectedOptionID: selectedOptionID,
        isCorrect: this.isOptionCorrect(questionID, selectedOptionID)
      });
    }
  }

  isOptionCorrect(questionID: number, selectedOptionID: number): boolean {
    const question = this.quizDetails.questions?.find(
      (q: any) => q.questionId === questionID
    );
    const selectedOption = question?.options.find(
      (opt: any) => opt.optionId === selectedOptionID
    );
    return selectedOption?.isCorrect || false;
  }

  isQuizEmpty() {
    return !this.quizDetails || !this.quizDetails.questions || this.quizDetails.questions.length === 0;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.quizId = +params['quizId'];
      this.subjectCode = params['subjectCode'];
      if (this.quizId) {
        this.getQuestionsAndOptionsByQuizId(this.quizId);
      } else {
        alert('Invalid Quiz ID');
      }
    });
  }
}
