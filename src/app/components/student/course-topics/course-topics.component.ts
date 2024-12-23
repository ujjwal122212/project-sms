import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-topics',
  standalone: true,
  imports: [],
  templateUrl: './course-topics.component.html',
  styleUrl: './course-topics.component.css'
})
export class CourseTopicsComponent implements OnInit {
  http = inject(HttpClient);
  subjectId!: number;
  constructor(private route: ActivatedRoute) { }
  courseTopic: any[] = []
  getSubjectTopicBySubjectId(subjectId: number) {
    this.http.get(`https://localhost:7262/GetTopicsBySubjectId/${subjectId}`).subscribe((response: any) => {
      this.courseTopic = response;
      // console.log(this.courseTopic);
    })
  }
  subject!:any
  getSubjectBySubjectId(subjectId: number) {
    this.http.get(`https://localhost:7262/api/Subject/row/${subjectId}`).subscribe((response:any)=>{
       this.subject=response;
      //  console.log(this.subject);
    })
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.subjectId = +params['subjectId'];
      // console.log('Received subjectId:', this.subjectId);
      this.getSubjectBySubjectId(this.subjectId);
      this.getSubjectTopicBySubjectId(this.subjectId);
    });
  }
}
