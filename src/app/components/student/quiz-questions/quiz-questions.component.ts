import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-quiz-questions',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './quiz-questions.component.html',
  styleUrl: './quiz-questions.component.css'
})
export class QuizQuestionsComponent implements OnInit {
  isloading:boolean=true;
  quizId!: number;
  subjectCode!:string
  quizDetails: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 1;
  totalPages = 1;
  route = inject(ActivatedRoute);
  http = inject(HttpClient);

  getQuestionsAndOptionsByQuizId(quizId: number) {
    this.http.get(`https://localhost:7262/api/QuizSubject/GetQuizDetailsWithQuestions/${quizId}`).subscribe((res: any) => {
      this.quizDetails = res;
      this.isloading=false;
      this.totalPages = Math.ceil(this.quizDetails.questions.length / this.itemsPerPage);
    });
  }

  submitQuiz() {
    alert('Quiz submitted successfully!');

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.quizId = +params['quizId'];
      this.subjectCode=params['subjectCode']
      if (this.quizId) {
        this.getQuestionsAndOptionsByQuizId(this.quizId);
      } else {
        alert('Invalid Section ID');
      }
    });
  }
}
