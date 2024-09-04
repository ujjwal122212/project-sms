import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {
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
          alert("Student is added Succesfully");
        }, error => {
          console.error('Error:', error);
        });
    }
}
