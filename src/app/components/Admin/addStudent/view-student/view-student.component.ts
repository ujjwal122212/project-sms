import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-view-student',
  standalone: true,

  imports: [CommonModule, FormsModule],

  imports: [RouterLink, CommonModule],

  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  userList: any[] = [];
  searchTerm: string = '';
  currentPage = 1;
  pageSize = 5;
  totalPages = 1;
  pageNumbers: number[] = [];


  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {

  toastr=inject(ToastrService);

  constructor(private http: HttpClient) {

    this.getAllUser();
  }

  getAllUser() {
    this.http.get<any[]>("https://localhost:7262/GetStudents").subscribe((result) => {
      this.userList = result;
      this.calculatePagination();
    });
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
          // this.toastr.info('Please confirm', 'Confirmation');


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


  get paginatedUserList() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredUserList.slice(start, end);
  }
  
}
