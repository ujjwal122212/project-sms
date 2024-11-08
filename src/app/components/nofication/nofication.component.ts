import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nofication',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nofication.component.html',
  styleUrls: ['./nofication.component.css'],
})
export class NoficationComponent {
  notificationStudent: any[] = [];

  constructor(private http: HttpClient) {
    this.getNotificationOfStudent();
  }

  getNotificationOfStudent(): void {
    this.http
      .get<any[]>(
        'https://localhost:7262/api/StudentsNotification/GetStudentNotification'
      )
      .subscribe((res) => {
        this.notificationStudent = res;
      });
  }
}
