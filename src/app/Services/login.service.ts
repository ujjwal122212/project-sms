import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private api="https://localhost:7262/login";
  http=inject(HttpClient);
  constructor() { }
  login(data:any){
    return this.http.post(this.api,data);
  }
}
