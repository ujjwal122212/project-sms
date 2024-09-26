import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr/toastr/toastr.service';

@Component({
  selector: 'app-add-contacts',
  standalone: true,
  imports: [],
  templateUrl: './add-contacts.component.html',
  styleUrl: './add-contacts.component.css'
})
export class AddContactsComponent {

  // toastr = inject(ToastrService);

  // student: any = {
  //   name: '',
  //   age: '',
  //   class: '',
  //   section: '',
  //   email: '',
  //   mobile: '',
  //   fatherName: '',
  // }

  // constructor(private http: HttpClient) { }

  // postStudentData() {
  //   const url = 'https://localhost:7262/CreateStudents';
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  //   this.http.post(url, this.student, { headers: headers, responseType: 'text' })
  //     .subscribe(response => {
  //       console.log('Response:', response);
  //       this.router.navigateByUrl("/viewstudent");
  //       this.toastr.success('Student Added Succesfully');
  //       // alert("Student is added Succesfully");

  //     }, error => {
  //       console.error('Error:', error);
  //     });
  // }


  // route = inject(ActivatedRoute);
  // Studentid!: number;
  // isEdit = false;
  // ngOnInit() {

  //   this.Studentid = this.route.snapshot.params['id'];
  //   if (this.Studentid) {
  //     this.isEdit = true;
  //     this.getStudentById(this.Studentid);

  //   }
  // }

  // getStudentById(Studentid: number) {
  //   this.http.get("https://localhost:7262/GetStudente/" + Studentid).subscribe((result: any) => {
  //     debugger;
  //     console.log(result);
  //     this.student = result;



  //   })
  // }


  // router = inject(Router);
  // UpdateStudent(studentId: number) {

  //   const url = 'https://localhost:7262/EditStudent/' + studentId;
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  //   this.http.put(url, this.student, { headers: headers, responseType: 'text' })
  //     .subscribe(
  //       response => {
  //         console.log('Response:', response);
  //         this.router.navigateByUrl("/viewstudent");
  //         // alert("Student Updated succesfully");
  //         this.toastr.success('Student Updated Succesfully');


  //       },
  //       error => {
  //         console.error('Error:', error);
  //       }
  //     );

  // }

  // Save() {
  //   if (this.isEdit) {
  //     this.UpdateStudent(this.Studentid);
  //   }
  //   else {
  //     this.postStudentData();
  //   }
  // }

  // goto(){
  //   this.router.navigateByUrl("/viewstudent");
  // }


}
