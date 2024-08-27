import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { IStudent } from '../../../../Interfaces/student';
import { CommonModule } from '@angular/common';
import { FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-student',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-new-student.component.html',
  styleUrl: './add-new-student.component.css'
})
export class AddNewStudentComponent {
student: IStudent = {
  Name: '',
  Age: 0,
  Class: '',
  Section: '',
  Email: '',
  Mobile: '',
  FathersName: '',
  };

  constructor(private http: HttpClient) {}

  postStudentData() {
    const url = 'https://localhost:7262/CreateStudents';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(url, this.student, { headers: headers, responseType: 'text' })
      .subscribe(response => {
        console.log('Response:', response);
      }, error => {
        console.error('Error:', error);
      });
  }
}
