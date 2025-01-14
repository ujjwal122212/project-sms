import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private enrollmentNumberSubject = new BehaviorSubject<number | null>(null);
  enrollmentNumber$ = this.enrollmentNumberSubject.asObservable();
  private api = "https://localhost:7262/login";
  http = inject(HttpClient);
  constructor() {
    if (this.isBrowser()) {
      const storedEnrollmentNumber = localStorage.getItem('enrollmentNumber');
      if (storedEnrollmentNumber) {
        this.enrollmentNumberSubject.next(Number(storedEnrollmentNumber));
      }
    }
    this.$refreshToken.subscribe((res:any)=>{
      this.getRefreshToken();
    })
  }
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
  setEnrollmentNumber(value: number) {
    if (this.isBrowser()) {
      localStorage.setItem('enrollmentNumber', value.toString());
    }
    this.enrollmentNumberSubject.next(value);
  }

  get enrollmentNumber(): number | null {
    if (this.isBrowser()) {
      return this.enrollmentNumberSubject.value || Number(localStorage.getItem('enrollmentNumber'));
    }
    return this.enrollmentNumberSubject.value;
  }
  login(data: any) {
    return this.http.post(this.api, data);
  }
  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('enrollmentNumber');
      localStorage.clear();
    }
    this.enrollmentNumberSubject.next(null);
  }


   // refresh token code 
   public $refreshToken=new Subject<boolean>;
   public $refreshTokenReceived=new Subject<boolean>;
   getRefreshToken(){
    const data={
      "enrollmentNumber":localStorage.getItem("Id"),
      "refreshToken":localStorage.getItem("refreshToken")
    }
    this.http.post(`https://localhost:7262/refresh`,data).subscribe((res:any)=>{
      console.log(res)
      localStorage.setItem("jwtToken",res.accessToken);
      localStorage.setItem("refreshToken",res.refreshToken);
      this.$refreshTokenReceived.next(true);
    })
   }
}
