import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-view-student',
  standalone: true,

  imports: [CommonModule, FormsModule,RouterLink],

  // imports: [RouterLink, CommonModule],

  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent {

  toastr=inject(ToastrService);

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
          // alert('Student deleted successfully.');
          this.toastr.error('Student Deleted Succesfully');
          // alertify.confirm('Confirm Message');
          this.toastr.info('Please confirm', 'Confirmation');


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
