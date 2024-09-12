import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-view-teacher',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './view-teacher.component.html',
  styleUrl: './view-teacher.component.css'
})
export class ViewTeacherComponent {
  toastr=inject(ToastrService);

  constructor(private http: HttpClient) {
    this.getAllUser();
  }

  userList: any[] = [];
  searchTerm: string = '';
  currentPage = 1;
  pageSize =6;
  totalPages = 1;
  pageNumbers: number[] = [];

  getAllUser() {
    // debugger;
    this.http.get("https://localhost:7262/GetTeacher").subscribe((result: any) => {
      this.userList = result;
      this.calculatePagination();
    })
  }


//delete user

deleteTeacher(id: number) {
  const isDelete=confirm("Are you sure you want to delete");
  if(isDelete){

    const url = `https://localhost:7262/DeleteTeacher/` + id;

    this.http.delete(url, { responseType: 'text' })
      .subscribe(
        response => {
          console.log('Response:', response);
          // alert('Student deleted successfully.');
          this.toastr.error('Teacher Deleted Succesfully');
          // alertify.confirm('Confirm Message');
          // this.toastr.info('Please confirm', 'Confirmation');


          this.getAllUser();
        },
        error => {
          console.error('Error:', error);
          alert('Failed to delete Teacher.');
        }
      );
  }


}


router = inject(Router);
onEdit(id: number) {
  console.log(id);
  this.router.navigateByUrl("/teacher/"+id)
 }


 calculatePagination() {
  const filteredList = this.filteredUserList;
  this.totalPages = Math.ceil(filteredList.length / this.pageSize);
  this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
}

setPage(page: number) {
  this.currentPage = page;
}

previousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
  }
}

get filteredUserList() {
  const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
  return this.userList.filter(student =>
    student.EnrollmentNo.toString().toLowerCase().includes(lowerCaseSearchTerm) ||
    student.Name.toLowerCase().includes(lowerCaseSearchTerm)
  );
}

get paginatedUserList() {
  const start = (this.currentPage - 1) * this.pageSize;
  const end = start + this.pageSize;
  return this.filteredUserList.slice(start, end);
}
}
