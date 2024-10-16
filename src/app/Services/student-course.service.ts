import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentCourseService {

  constructor() { }
  http=inject(HttpClient);
  private apiurl="https://localhost:7262"
  getClasses(){
    return this.http.get(`${this.apiurl}/Classes`);
  }
  getSectionByClassId(classId:number){
    return this.http.get(`${this.apiurl}/${classId}`);
  }
  getSubjectBySectionId(sectionId:number){
    return this.http.get(`${this.apiurl}/api/Subject/${sectionId}`);
  }
  addSubjects(data:any){
    return this.http.post(`${this.apiurl}/api/Subject/Add Subjects`,data);
  }
}
