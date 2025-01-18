import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-teacher-notification',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './teacher-notification.component.html',
  styleUrl: './teacher-notification.component.css'
})
  
export class TeacherNotificationComponent implements OnInit{
   toastr = inject(ToastrService);
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
      this.toastr.warning("Please fill all the valid details");
      return;
    }
    const formvalue = this.studentNotificationform.value;
    this.http.post('https://localhost:7262/api/TeachersNotification/Add TeachersNotification', formvalue, { responseType: 'text' })
      .subscribe((res: any) => {
        this.toastr.success("Teacher Notification Added Successfully");
        this.getAllNotification();
        this.studentNotificationform.reset();
        this.CloseModel();
      }, error => {
        console.error("Error:", error);
        this.toastr.warning("Failed to add Student Notification");
      });
  }
  editStudentNotification(NotificationID: number) {
    this.openform();
    this.http.get(`https://localhost:7262/api/TeachersNotification/row/${NotificationID}`).subscribe((res: any) => {
      console.log(res);
      this.studentNotificationform.patchValue(res);
    })
  }
  updation() {
    if (this.studentNotificationform.invalid) {
      this.toastr.warning("Please fill all the valid details");
      return;
    }
    const formvalue = this.studentNotificationform.value;
    this.http.put(`https://localhost:7262/api/TeachersNotification/${formvalue.notificationID}`, formvalue, { responseType: 'text' })
      .subscribe((res: any) => {
        this.toastr.success("Teacher Notification Updated Successfully");
        this.getAllNotification();
        this.studentNotificationform.reset();
        this.CloseModel();
      }, error => {
        console.error("Error:", error);
        this.toastr.error("Failed to update Student Notification");
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
    this.http.get('https://localhost:7262/api/TeachersNotification/GetTeachersNotification').subscribe((result: any) => {
      this.studentNotification = result;
      console.log(this.studentNotification);
    })
  }
  deleteStudentNotification(NotificationID: number) {
    const isconfirm = confirm("Are you sure to want to delete this notificataion ?")
    if (isconfirm) {
      this.http.delete(`https://localhost:7262/api/TeachersNotification/${NotificationID}`, { responseType: 'text' }).subscribe((result: any) => {
        alert("Teacher Notification Deleted Successfully");
        this.getAllNotification();
        this.CloseModel();
      })
    }
  }
  ngOnInit(): void {
    this.setformstate();
    this.getAllNotification();
  }

}
