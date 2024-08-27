import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IStudent } from '../../../../Interfaces/student';
import { HttpService } from '../../../../http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-student',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.css'
})
export class ViewStudentComponent {
  studentList:IStudent[]=[];
 httpService=inject(HttpService);
 display:string[]=['EnrollmentNo','Name','Age','Class','Section','Email','Mobile','FathersName','Password','EnrollmentDate']

 ngOnInit(){

  this.httpService.GetAllStudent().subscribe(result=>{
    this.studentList=result;
    console.table(this.studentList);
  })
 }
}
