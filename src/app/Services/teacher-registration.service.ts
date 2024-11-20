import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeacherRegistrationService {
  http=inject(HttpClient);
  private apiurl="https://localhost:7262";
  constructor() { }
  getStates() {
    return this.http.get(`${this.apiurl}/api/State`);
  }
  getDistrictByStateId(stateId: number) {
    return this.http.get(`${this.apiurl}/api/District/${stateId}`);
  }
  addTeacherDetails(data:FormData){
    return this.http.post(`${this.apiurl}/api/Teacher/RegisterTeacher`, data);
  }
  getAllTeachers(){
    return this.http.get(`${this.apiurl}/api/Teacher/GetTeachers`)
  }
  getTeacherById(enrollmentNumber:number){
    return this.http.get(`${this.apiurl}/api/Teacher/GetTeacherByID${enrollmentNumber}`);
  }
  deleteacherById(enrollmentNumber:number){
    return this.http.delete(`${this.apiurl}/api/Teacher/DeleteTeacher/${enrollmentNumber}`);
  }
  editTeacherByID(enrollmentNumber:number,data:FormData){
    return this.http.put(`${this.apiurl}/api/Teacher/EditRegisterdTeacher/${enrollmentNumber}`, data);
  }
  getAllTeacherDetailsByEnrollmentNumber(enrollmentNumber:number){
    return this.http.get(`${this.apiurl}/api/Teacher/GetTeachersByIdAllDetails/${enrollmentNumber}`);
  }
}
