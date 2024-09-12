import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new-teacher',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-new-teacher.component.html',
  styleUrl: './add-new-teacher.component.css'
})
export class AddNewTeacherComponent {
  toastr = inject(ToastrService);

  teacher: any = {
    name: '',
    age: '',
    email: '',
    mobile: '',
    fatherName: '',
  }

  constructor(private http: HttpClient) { }

  postStudentData() {
    const url = 'https://localhost:7262/CreateTeacher';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(url, this.teacher, { headers: headers, responseType: 'text' })
      .subscribe(response => {
        console.log('Response:', response);
        this.router.navigateByUrl("/viewTeacher");
        this.toastr.success('Teacher Added Succesfully');
        // alert("Student is added Succesfully");

      }, error => {
        console.error('Error:', error);
      });
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
    this.http.get("https://localhost:7262/GetTeacher/" + Studentid).subscribe((result: any) => {
      debugger;
      console.log(result);
      this.teacher = result;



    })
  }


  router = inject(Router);
  UpdateStudent(studentId: number) {

    const url = 'https://localhost:7262/EditTeacher/' + studentId;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(url, this.teacher, { headers: headers, responseType: 'text' })
      .subscribe(
        response => {
          console.log('Response:', response);
          this.router.navigateByUrl("/viewTeacher");
          // alert("Student Updated succesfully");
          this.toastr.success('Teacher Updated Succesfully');


        },
        error => {
          console.error('Error:', error);
        }
      );

  }

  Save() {
    if (this.isEdit) {
      this.UpdateStudent(this.Studentid);
    }
    else {
      this.postStudentData();
    }
  }

  goto(){
    this.router.navigateByUrl("/viewTeacher");
  }

}
