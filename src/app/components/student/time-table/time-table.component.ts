import { Component, inject, OnInit } from '@angular/core';
import { StudenttimetableService } from '../../../Services/studenttimetable.service';

@Component({
  selector: 'app-time-table',
  standalone: true,
  imports: [],
  templateUrl: './time-table.component.html',
  styleUrl: './time-table.component.css'
})
export class TimeTableComponent implements OnInit {
  timetableService = inject(StudenttimetableService);
  timeTable: any[] = [];
  tableHeader:string[]=['S.No','TimeSlot','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  getTimetableBySectionId(id:number){
    this.timetableService.getTimeTableBySectionId(id).subscribe((res:any)=>{
      this.timeTable=res;
      console.log(this.timeTable);
    })
  }
  ngOnInit(): void {
  this.getTimetableBySectionId(1);
  }
}
