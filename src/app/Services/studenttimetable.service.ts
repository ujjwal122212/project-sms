import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudenttimetableService {

  constructor() { }
  http=inject(HttpClient);
  private apiurl="https://localhost:7262";
  getClasses(){
    return this.http.get(`${this.apiurl}/Classes`);
  }
  getSectionByClassId(classId:number){
    return this.http.get(`${this.apiurl}/${classId}`);
  }
  getTimeTableBySectionId(sectionId:number){
    return this.http.get(`${this.apiurl}/api/StudentTimetable/${sectionId}`);
  }

  addTimeTable(data:any){
    return this.http.post(`${this.apiurl}/api/StudentTimeTable/Add TimeTable`,data);
  }
  deleteTimeTable(id:number){
    return this.http.delete(`${this.apiurl}/api/StudentTimeTable/${id}`);
  }
  getTimeTableById(id:number){
    return this.http.get(`${this.apiurl}/api/StudentTimeTable/row/${id}`);
  }
  updateTimetable(timetableData: any) {
    const data = {
      timetbaleId: timetableData.timetbaleId,
      timeSlot: timetableData.timeSlot,
      sunday: 'Leave',
      monday: timetableData.monday,
      tuesday: timetableData.tuesday,
      wednesday: timetableData.wednesday,
      thursday: timetableData.thursday,
      friday: timetableData.friday,
      saturday: timetableData.saturday
    };
    return this.http.put(`${this.apiurl}/api/StudentTimeTable/${timetableData.timetbaleId}`, data);
  }
}
