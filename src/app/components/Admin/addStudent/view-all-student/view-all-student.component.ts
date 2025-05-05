import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentRegistrationService } from '../../../../Services/student-registration.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError, concatMap, map, Observable, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-view-all-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-all-student.component.html',
  styleUrl: './view-all-student.component.css',
})
export class ViewAllStudentComponent implements OnInit {
  toastr = inject(ToastrService);
  route = inject(Router);
  constructor(private http: HttpClient) {
    this.getAllStudent();
  }
  studentList:any[]= [];
  
getAllStudent(){
  this.http.get("https://localhost:7262/GetAllStudents").subscribe((result:any)=>{
    this.studentList = result;
    console.table(this.studentList);
  })
}
 

  

downloadAdmissionReceipt(enrollmentNumber: number) {
  const url = `https://localhost:7262/GetAdmissionReceiptPdf/${enrollmentNumber}`;
  
  this.http.get(url, { responseType: 'blob' }).subscribe(
    (blob: Blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = `AdmissionFeeReceipt_${enrollmentNumber}.pdf`;
      a.click();
      URL.revokeObjectURL(objectUrl);
    },
    error => {
      this.toastr.error('Failed to download the receipt.', 'Error');
    }
  );
}

downloadAdmissionFeeReceipt(enrollmentNumber: number) {
  const url = `https://localhost:7262/api/AdmissionFee/GenerateAdmissionFeeReceipt/${enrollmentNumber}`;
  
  this.http.get(url, { responseType: 'blob' }).subscribe(
    (blob: Blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = `AdmissionFeeReceipt_${enrollmentNumber}.pdf`;
      a.click();
      URL.revokeObjectURL(objectUrl);
    },
    error => {
      this.toastr.error('Failed to download the receipt.', 'Error');
    }
  );
}
 

  

  ngOnInit(): void {
    
  }
}
