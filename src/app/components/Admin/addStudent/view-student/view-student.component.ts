import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IStudent } from '../../../../Interfaces/student';
import { HttpService } from '../../../../http.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-view-student',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.css'
})
export class ViewStudentComponent {

  constructor(private http: HttpClient) {
    this.getAllUser();
  }

  userList: any[] = [];


  getAllUser() {
    // debugger;
    this.http.get("https://localhost:7262/GetStudents").subscribe((result: any) => {
      // debugger;
      this.userList = result;
    })
  }


//delete user

deleteEmployee(id: number) {
  const isDelete=confirm("Are you sure you want to delete");
  if(isDelete){

    const url = `https://localhost:7262/DeleteStudents/` + id;

    this.http.delete(url, { responseType: 'text' })
      .subscribe(
        response => {
          console.log('Response:', response);
          alert('Student deleted successfully.');
          this.getAllUser();
        },
        error => {
          console.error('Error:', error);
          alert('Failed to delete student.');
        }
      );
  }


}


router = inject(Router);
onEdit(id: number) {
  console.log(id);
  this.router.navigateByUrl("/employee/"+id)
 }

}
