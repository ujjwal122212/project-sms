import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-quiz2',
  standalone: true,
  imports: [],
  templateUrl: './quiz2.component.html',
  styleUrl: './quiz2.component.css'
})
export class Quiz2Component implements OnInit {
  subjectId!: number;
  subjectCode!:string
  subTitleAndDes: any[] = []
  http = inject(HttpClient)
  public getQuizTitleAndDesBysubjectId(subjectId: number) {
    this.http.get(`https://localhost:7262/api/QuizSubject/GetQuizzesBySubjectId/${subjectId}`).subscribe((res: any) => {
      this.subTitleAndDes = res;
      // console.log(this.subTitleAndDes);
    })
  }
  router = inject(Router)
  goto(quizId: number,subjectCode:string) {
    this.router.navigate([`studentlayout/quiz1/quiz2/questions`], {
      queryParams: { quizId: quizId,subjectCode:this.subjectCode }
    });
  }

  route = inject(ActivatedRoute)
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.subjectId = +params['subjectId'];
      this.subjectCode=params['subjectCode'];
      if (this.subjectId) {
        this.getQuizTitleAndDesBysubjectId(this.subjectId);
      } else {
        alert('Invalid Section ID');
      }
    });
  }
}
