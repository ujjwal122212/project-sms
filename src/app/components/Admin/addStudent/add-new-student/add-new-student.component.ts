
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


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

  route=inject(ActivatedRoute);
  Studentid! :number;
  isEdit=false;
  ngOnInit() {

    this.Studentid=this.route.snapshot.params['id'];
    if(this.Studentid){
      this.isEdit=true;
  this.getStudentById(this.Studentid);

    }
  }

  getStudentById(Studentid: number){
    this.http.get("https://localhost:7262/GetStudent/"+Studentid).subscribe((result: any) => {
      console.log(result);
      // this.student = result;


    })
  }

}
