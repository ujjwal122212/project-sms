import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TeacherRegistrationService } from '../../../../Services/teacher-registration.service';


@Component({
  selector: 'app-view-teacher',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './view-teacher.component.html',
  styleUrl: './view-teacher.component.css'
})
export class ViewTeacherComponent implements OnInit{
  router=inject(Router);
  regService=inject(TeacherRegistrationService);
  teachers:any[]=[];
  openForm(){
   this.router.navigateByUrl('/adminlayout/viewTeacher/addTeacher');
  }
  more_Details(enrollmentNumber:number){
    this.router.navigateByUrl('/adminlayout/viewTeacher/viewteacherdetails/'+enrollmentNumber);
  }
  getAllTeachers(){
    this.regService.getAllTeachers().subscribe((res:any)=>{
      this.teachers=res;
      console.log(this.teachers);
    })
  }
  ngOnInit(): void {
     this.getAllTeachers(); 
  }
}
