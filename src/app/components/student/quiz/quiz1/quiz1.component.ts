import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-quiz1',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './quiz1.component.html',
  styleUrl: './quiz1.component.css'
})
export class Quiz1Component implements OnInit {
  https = inject(HttpClient);
  route = inject(Router)
  quizSubjects: any[] = []
  public getStudentByEnrollmentNumber(enrollmentNumber: number) {
    this.https.get(`https://localhost:7262/GetStudentByIdAllDetails/${enrollmentNumber}`).subscribe((res: any) => {
      const sectionId = res.sectionId;
      this.getQuizSubjectsBySectionId(sectionId);
    })
  }
  getQuizSubjectsBySectionId(sectionId: number) {
    this.https.get(`https://localhost:7262/api/QuizSubject/${sectionId}`).subscribe((res: any) => {
      this.quizSubjects = res;
    })
  }
  goto(subjectId: number,subjectCode:string) {
    this.route.navigate(['studentlayout/quiz1/quiz2'], {
      queryParams: { subjectId: subjectId,subjectCode:subjectCode }
    });
  }
  
  ngOnInit(): void {
    const enrollmentNumber = localStorage.getItem("Id");
    const value = enrollmentNumber ? parseInt(enrollmentNumber, 10) : null;
    if (value) {
      this.getStudentByEnrollmentNumber(value);
    }
  }
}
