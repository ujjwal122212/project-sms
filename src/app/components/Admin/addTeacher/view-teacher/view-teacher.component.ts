import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TeacherRegistrationService } from '../../../../Services/teacher-registration.service';

@Component({
  selector: 'app-view-teacher',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './view-teacher.component.html',
  styleUrl: './view-teacher.component.css',
})
export class ViewTeacherComponent implements OnInit {
  
  router = inject(Router);
  regService = inject(TeacherRegistrationService);
  teachers: any[] = [];
  searchTerm: string = '';
  
  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;

  openForm() {
    this.router.navigateByUrl('/adminlayout/viewTeacher/addTeacher');
  }
  more_Details(enrollmentNumber: number) {
    this.router.navigateByUrl(
      '/adminlayout/viewTeacher/viewteacherdetails/' + enrollmentNumber
    );
  }
  getAllTeachers() {
    this.regService.getAllTeachers().subscribe((res: any) => {
      this.teachers = res;
      this.calculateTotalPages();
    });
  }

  get filteredUserList() {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    const filtered = this.teachers.filter(
      (teacher) =>
        teacher.enrollmentNumber
          .toString()
          .toLowerCase()
          .includes(lowerCaseSearchTerm) ||
        teacher.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
    this.calculateTotalPages(filtered.length);
    return this.getPaginatedItems(filtered);
  }

  getPaginatedItems(items: any[]): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return items.slice(startIndex, endIndex);
  }

  calculateTotalPages(totalItems?: number) {
    const items = totalItems || this.teachers.length;
    this.totalPages = Math.ceil(items / this.itemsPerPage);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    
    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        for (let i = 1; i <= maxVisiblePages; i++) {
          pages.push(i);
        }
      } else if (this.currentPage >= this.totalPages - 2) {
        for (let i = this.totalPages - maxVisiblePages + 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = this.currentPage - 2; i <= this.currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    return pages;
  }

  trackByEnrollmentNumber(index: number, teacher: any): number {
    return teacher.enrollmentNumber;
  }

  ngOnInit(): void {
    this.getAllTeachers();
  }
}
