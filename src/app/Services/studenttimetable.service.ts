import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudenttimetableService {
  sectionId!:number;
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
    return this.http.post(`${this.apiurl}/api/StudentTimeTable/AddTimeTable`,data);
  }
  deleteTimeTable(id:number){
    return this.http.delete(`${this.apiurl}/api/StudentTimeTable/${id}`);
  }
  getTimeTableById(id:number){
    return this.http.get(`${this.apiurl}/api/StudentTimeTable/row/${id}`);
  }
  updateTimetable(data:any,timetableId:number) {
    return this.http.put(`${this.apiurl}/api/StudentTimeTable/${timetableId}`, data);
  }
}
