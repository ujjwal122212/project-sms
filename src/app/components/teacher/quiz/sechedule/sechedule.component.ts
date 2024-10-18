import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sechedule',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './sechedule.component.html',
  styleUrl: './sechedule.component.css'
})
export class SecheduleComponent {
  ClassList:any[]=[];
  SectionList:any[]=[];
  SubjectList:any[]=[];

  ClassId:string='';
  SectionId:string='';

  constructor(private http: HttpClient) {
    this.getClass();

  }

  getClass(){
    this.http.get("https://localhost:7262/Classes").subscribe((result:any)=>{
       this.ClassList=result;
    })
  }

  GetSectionById(){
    this.http.get("https://localhost:7262/"+this.ClassId).subscribe((result: any) => {

      this.SectionList = result;

    })
  }

  GetSubjectById(){
    this.http.get("https://localhost:7262/api/QuizSubject/"+this.SectionId).subscribe((result: any) => {

      this.SubjectList = result;

    })
  }

}
