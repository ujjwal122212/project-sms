import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentAdmissionService {
  private studentDataSubject=new BehaviorSubject<any>(null);
  studentData$=this.studentDataSubject.asObservable();

  private parentDataSubject = new BehaviorSubject<any>(null);
  parentData$ = this.parentDataSubject.asObservable();

  setStudentData(data: any) {
    this.studentDataSubject.next(data);
  }

  setParentData(data: any) {
    this.parentDataSubject.next(data);
  }
  constructor() { }
}
