import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-quiz-questions',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './quiz-questions.component.html',
  styleUrl: './quiz-questions.component.css'
})
export class QuizQuestionsComponent implements OnInit {
  isloading: boolean = true;
  isEmpty: boolean = true;
  quizId!: number;
  subjectCode!: string
  quizDetails: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 1;
  totalPages = 1;
  route = inject(ActivatedRoute);
  http = inject(HttpClient);

  getQuestionsAndOptionsByQuizId(quizId: number) {
    this.isloading = true; 

    this.http.get(`https://localhost:7262/api/QuizSubject/GetQuizDetailsWithQuestions/${quizId}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error("Error fetching quiz details:", error);
          this.isloading = false;
          this.isEmpty = true; 
          this.quizDetails = {}; 
          if(error.status==404){
            alert("No data found");
          }
          return throwError(error);
        })
      )
      .subscribe((res: any) => {
        this.quizDetails = res;
        this.isloading = false;
        this.isEmpty = !res || !res.questions || res.questions.length === 0;
        this.totalPages = this.isEmpty ? 0 : Math.ceil(this.quizDetails.questions.length / this.itemsPerPage);
      });
  }

  submitQuiz() {
    alert('Quiz submitted successfully!');
  }

  isQuizEmpty() {
    return Object.keys(this.quizDetails).length > 0;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.quizId = +params['quizId'];
      this.subjectCode = params['subjectCode']
      if (this.quizId) {
        this.getQuestionsAndOptionsByQuizId(this.quizId);
      } else {
        alert('Invalid Section ID');
      }
    });
  }
}
