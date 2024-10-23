import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // private enrollmentNumber!:number
  private api = "https://localhost:7262/login";
  http = inject(HttpClient);
  constructor() { }
  // get EnrollmentNumber(): number {
  //   return this.enrollmentNumber;
  // }
  // set EnrollmentNumber(value: number) {
  //   this.enrollmentNumber = value;
  // }
  set enrollmentNumber(value: number) {
    sessionStorage.setItem('enrollmentNumber', value.toString());
  }

  // Retrieve the enrollment number from sessionStorage
  get enrollmentNumber(): number {
    const storedValue = sessionStorage.getItem('enrollmentNumber');
    return storedValue ? Number(storedValue) : 0;
  }
  login(data: any) {
    return this.http.post(this.api, data);
  }
}
