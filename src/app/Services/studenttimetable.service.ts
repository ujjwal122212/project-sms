import { HttpClient } from '@angular/common/http';
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
}
