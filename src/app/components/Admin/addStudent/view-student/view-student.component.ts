import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    this.getAllUser();
  }

  getAllUser() {
    this.http.get<any[]>("https://localhost:7262/GetStudents").subscribe((result) => {
      this.userList = result;
      this.calculatePagination();
    });
  }

  deleteEmployee(id: number) {
    const isDelete = confirm("Are you sure you want to delete");
    if (isDelete) {
      const url = `https://localhost:7262/DeleteStudents/${id}`;
      this.http.delete(url, { responseType: 'text' })
        .subscribe(
          () => {
            alert('Student deleted successfully.');
            this.getAllUser();
          },
          () => alert('Failed to delete student.')
        );
    }
  }

  onEdit(id: number) {
    this.router.navigateByUrl(`/employee/${id}`);
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
