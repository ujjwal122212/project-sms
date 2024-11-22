import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminRegistrationService {

  http=inject(HttpClient);
  private apiurl="https://localhost:7262";
  constructor() { }
  getStates() {
    return this.http.get(`${this.apiurl}/api/State`);
  }
  getDistrictByStateId(stateId: number) {
    return this.http.get(`${this.apiurl}/api/District/${stateId}`);
  }
  getAllAdmins(){
    return this.http.get(`${this.apiurl}/GetAdmins`);
  }
  addAdminDetails(formdata:FormData){
    return this.http.post(`${this.apiurl}/RegisterAdmin`, formdata);
  }
  deleteAdmin(enrollmentNumber:number){
    return this.http.delete(`${this.apiurl}/DeleteAdmin/${enrollmentNumber}`);
  }
  getAdminById(enrollmentNumber:number){
    return this.http.get(`${this.apiurl}/GetAdminByID${enrollmentNumber}`);
  }
  updateAdmin(enrollmentNumber:number,formdata:FormData){
    return this.http.put(`${this.apiurl}/EditRegisterdAdmin/${enrollmentNumber}`, formdata);
  }
  getAllAdminDetails(enrollmentNumber:number){
    return this.http.get(`${this.apiurl}/GetAdminByIdAllDetails/${enrollmentNumber}`);
  }
}
