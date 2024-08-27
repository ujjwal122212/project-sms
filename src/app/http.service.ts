import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IStudent } from './Interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  http=inject(HttpClient);

  constructor() { }


  GetAllStudent(){
    return this.http.get<IStudent[]>("https://localhost:7262/GetStudents");
  }
}
