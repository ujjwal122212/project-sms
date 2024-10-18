import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentRegistrationService {

  constructor() { }
  http=inject(HttpClient);
  private apiurl = "https://localhost:7262"
  getClasses() {
    return this.http.get(`${this.apiurl}/Classes`);
  }
  getSectionByClassId(classId: number) {
    return this.http.get(`${this.apiurl}/${classId}`);
  } 
  getStates(){
    return this.http.get(`${this.apiurl}/api/State`);
  }
  getDistrictByStateId(stateId:number){
    return this.http.get(`${this.apiurl}/api/District/${stateId}`);
  }
  addStudent(data:FormData){
    return this.http.post(`${this.apiurl}/RegisterStudent`,data);
  }
}
