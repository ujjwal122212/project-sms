import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentRegistrationService {

  constructor() { }
  http = inject(HttpClient);
  private apiurl = "https://localhost:7262"
  getClasses() {
    return this.http.get(`${this.apiurl}/Classes`);
  }
  getSectionByClassId(classId: number) {
    return this.http.get(`${this.apiurl}/${classId}`);
  }
  getStates() {
    return this.http.get(`${this.apiurl}/api/State`);
  }
  getDistrictByStateId(stateId: number) {
    return this.http.get(`${this.apiurl}/api/District/${stateId}`);
  }
  addStudent(data: FormData) {
    return this.http.post(`${this.apiurl}/RegisterStudent`, data);
  }
  getStudentsBySectionID(sectionId: number) {
    return this.http.get(`${this.apiurl}/GetStudentsBySectionID/${sectionId}`);
  }
  deleteStudentByStudentId(studentID: number) {
    return this.http.delete(`${this.apiurl}/DeleteStudent/${studentID}`);
  }
  getStudentByStudentID(studentID:number){
    return this.http.get(`${this.apiurl}/GetStudentByID${studentID}`);
  }
  UpdateStudentByStudentID(studentID:number,data:FormData){
    return this.http.put(`${this.apiurl}/EditRegisterdStudent/${studentID}`, data);
  }
}
