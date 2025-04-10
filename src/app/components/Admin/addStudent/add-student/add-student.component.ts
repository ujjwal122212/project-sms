import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css',
})
export class AddStudentComponent {
  toastr = inject(ToastrService);

  student: any = {
    name: '',
    age: '',
    class: '',
    section: '',
    email: '',
    mobile: '',
    fatherName: '',
  };

  constructor(private http: HttpClient) {}

  postStudentData() {
    const url = 'https://localhost:7262/CreateStudents';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post(url, this.student, { headers: headers, responseType: 'text' })
      .subscribe(
        (response) => {
          console.log('Response:', response);

          this.toastr.success('Student Added Succesfully');
          this.router.navigateByUrl('/viewAllStudent');
          // alert("Student is added Succesfully");
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  route = inject(ActivatedRoute);
  Studentid!: number;
  isEdit = false;
  ngOnInit() {
    this.Studentid = this.route.snapshot.params['id'];
    if (this.Studentid) {
      this.isEdit = true;
      this.getStudentById(this.Studentid);
    }
  }

  getStudentById(Studentid: number) {
    this.http
      .get('https://localhost:7262/GetStudente/' + Studentid)
      .subscribe((result: any) => {
        // debugger;
        console.log(result);
        this.student = result;
      });
  }

  router = inject(Router);
  UpdateStudent(studentId: number) {
    const url = 'https://localhost:7262/EditStudent/' + studentId;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put(url, this.student, { headers: headers, responseType: 'text' })
      .subscribe(
        (response) => {
          console.log('Response:', response);
          this.router.navigateByUrl('/viewstudent');
          // alert("Student Updated succesfully");
          this.toastr.success('Student Updated Succesfully');
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  Save() {
    if (this.isEdit) {
      this.UpdateStudent(this.Studentid);
    } else {
      this.postStudentData();
    }
  }

  goto() {
    this.router.navigateByUrl('/viewstudent');
  }
}
