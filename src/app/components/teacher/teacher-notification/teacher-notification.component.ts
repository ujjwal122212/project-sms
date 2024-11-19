import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacher-notification.component.html',
  styleUrl: './teacher-notification.component.css',
})
export class TeacherNotificationComponent {
  notificationStudent: any[] = [];

  constructor(private http: HttpClient) {
    this.getNotificationOfStudent();
  }

  getNotificationOfStudent(): void {
    this.http
      .get<any[]>(
        'https://localhost:7262/api/TeachersNotification/GetTeachersNotification'
      )
      .subscribe((res) => {
        this.notificationStudent = res;
      });
  }
}
