
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-new-student',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './add-new-student.component.html',
  styleUrl: './add-new-student.component.css'
})
export class AddNewStudentComponent {
student:any={
  name: '',
  age: '',
  class: '',
  section: '',
  email: '',
  mobile: '',
  fatherName: '',
}

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
