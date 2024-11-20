import { Component, inject, OnInit } from '@angular/core';
import { TeacherRegistrationService } from '../../../../Services/teacher-registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-teacher-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-teacher-details.component.html',
  styleUrl: './view-teacher-details.component.css'
})
export class ViewTeacherDetailsComponent implements OnInit {
  regService = inject(TeacherRegistrationService);
  constructor(private route:Router){

  }
  teacher: any
  activatedRoute = inject(ActivatedRoute);
  enrollmentNumber!: number;
  async getTeacherDetailsById() {
    this.enrollmentNumber = this.activatedRoute.snapshot.params['enrollmentNumber'];
    if (this.enrollmentNumber) {
      await this.regService.getAllTeacherDetailsByEnrollmentNumber(this.enrollmentNumber).subscribe(async (res) => {
        this.teacher = res;
        console.log(this.teacher);
      })
    }

  }
  deleteTeacherByEnrollmentNumber(enrollmentNumber:number){
    const isConfirm=confirm("Are You sure to want to delete this teacher ?");
    if(isConfirm){
      this.regService.deleteacherById(enrollmentNumber).subscribe((res:any)=>{
        alert("Teacher Deleted Successfully");
        this.route.navigateByUrl('/adminlayout/viewTeacher');
      })
    }
  }
  EditTeacherById(enrollmentNumber:number){
    this.route.navigateByUrl('/adminlayout/viewTeacher/addTeacher/'+enrollmentNumber);
  }
  ngOnInit(): void {
    this.getTeacherDetailsById();
  }
}
