import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { StudentCourseService } from '../../../Services/student-course.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, RouterOutlet,CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  subjectService = inject(StudentCourseService);
  Subjects:any[]=[];
  getAllSubjectsBySectionId(id:number){
   this.subjectService.getSubjectBySectionId(id).subscribe((res:any)=>{
   this.Subjects=res;
   console.log(this.Subjects);
   }) 
  }
  ngOnInit(): void {
  this.getAllSubjectsBySectionId(2);
  }
}
