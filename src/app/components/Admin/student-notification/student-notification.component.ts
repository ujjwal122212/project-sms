import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-notification',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './student-notification.component.html',
  styleUrl: './student-notification.component.css'
})
export class StudentNotificationComponent implements OnInit {
  http = inject(HttpClient);
  studentNotificationform: FormGroup = new FormGroup({});
  studentNotification: any[] = []
  constructor(private fb: FormBuilder) {

  }
  openform() {
    const stuform = document.getElementById('formModel');
    if (stuform != null) {
      stuform.classList.add('openform');
    }
  }
  CloseModel() {
    this.setformstate();
    const stuform = document.getElementById('formModel');
    if (stuform != null) {
      stuform.classList.remove('openform');
    }
  }
  setformstate() {
    this.studentNotificationform = this.fb.group({
      notificationID: [0],
      notificationTopic: ['', Validators.required],
      notificationText: ['', Validators.required]
    })
  }
  insertStudentNotification() {
    if (this.studentNotificationform.invalid) {
      alert("Please fill all the valid details");
      return;
    }
    const formvalue = this.studentNotificationform.value;
    this.http.post('https://localhost:7262/api/StudentsNotification/Add StudentsNotification', formvalue, { responseType: 'text' })
      .subscribe((res: any) => {
        alert("Student Notification added successfully");
        this.getAllNotification();
        this.studentNotificationform.reset();
        this.CloseModel();
      }, error => {
        console.error("Error:", error);
        alert("Failed to add Student Notification");
      });
  }
  editStudentNotification(NotificationID: number) {
    this.openform();
    this.http.get(`https://localhost:7262/api/StudentsNotification/row/${NotificationID}`).subscribe((res: any) => {
      console.log(res);
      this.studentNotificationform.patchValue(res);
    })
  }
  updation() {
    if (this.studentNotificationform.invalid) {
      alert("Please fill all the valid details");
      return;
    }
    const formvalue = this.studentNotificationform.value;
    this.http.put(`https://localhost:7262/api/StudentsNotification/${formvalue.notificationID}`, formvalue, { responseType: 'text' })
      .subscribe((res: any) => {
        alert("Student Notification updated successfully");
        this.getAllNotification();
        this.studentNotificationform.reset();
        this.CloseModel();
      }, error => {
        console.error("Error:", error);
        alert("Failed to update Student Notification");
      });
  }

  onSubmit() {
    if (this.studentNotificationform.value.notificationID == 0) {
      this.insertStudentNotification();
    }
    else if (this.studentNotificationform.value.notificationID > 0) {
      this.updation();
    }
  }
  getAllNotification() {
    this.http.get('https://localhost:7262/api/StudentsNotification/GetStudentNotification').subscribe((result: any) => {
      this.studentNotification = result;
      console.log(this.studentNotification);
    })
  }
  deleteStudentNotification(NotificationID: number) {
    const isconfirm = confirm("Are you sure to want to delete this notificataion ?")
    if (isconfirm) {
      this.http.delete(`https://localhost:7262/api/StudentsNotification/${NotificationID}`, { responseType: 'text' }).subscribe((result: any) => {
        this.getAllNotification();
        alert("Stdent Notifiction Deleted Successfully");
        this.CloseModel();
      })
    }
  }
  ngOnInit(): void {
    this.setformstate();
    this.getAllNotification();
  }
}
