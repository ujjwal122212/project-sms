import { Component, inject, OnInit } from '@angular/core';
import { StudenttimetableService } from '../../../Services/studenttimetable.service';
import { LoginService } from '../../../Services/login.service';
import { StudentRegistrationService } from '../../../Services/student-registration.service';

@Component({
  selector: 'app-time-table',
  standalone: true,
  imports: [],
  templateUrl: './time-table.component.html',
  styleUrl: './time-table.component.css'
})
export class TimeTableComponent implements OnInit {
  enrollmentNo!: number;
  sectionId!:number;
  timetableService = inject(StudenttimetableService);
  loginService = inject(LoginService);
  regService=inject(StudentRegistrationService);
  timeTable: any[] = [];
  students:any[]=[];
  tableHeader: string[] = ['S.No', 'TimeSlot', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  getStudentByEnrollmentNumber(enrollmentNo:number){
   this.regService.getStudentByStudentID(enrollmentNo).subscribe((result:any)=>{
     this.students=result;
     this.sectionId=result.sectionId;
     this.getTimetableBySectionId(this.sectionId);
     console.log("Here sectionId is",this.sectionId);
     console.log(this.students);
   })
  }
  getTimetableBySectionId(id: number) {
    this.timetableService.getTimeTableBySectionId(id).subscribe((res: any) => {
      this.timeTable = res;
      console.log(this.timeTable);
    })
  }
  ngOnInit(): void {
    this.enrollmentNo = this.loginService.enrollmentNumber;
    console.log("Login Enrollment Number:", this.enrollmentNo);
    this.getStudentByEnrollmentNumber(this.enrollmentNo);
  }
}
