import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentRegistrationService } from '../../../../Services/student-registration.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError, concatMap, map, Observable, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-view-all-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-all-student.component.html',
  styleUrl: './view-all-student.component.css',
})
export class ViewAllStudentComponent implements OnInit {
  toastr = inject(ToastrService);
  route = inject(Router);
  constructor(private http: HttpClient) {
    this.getAllStudent();
  }
  studentList: any[] = [];
  filteredStudents: any[] = [];
  searchTerm: string = '';
  
  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalItems: number = 0;
  totalPages: number = 0;
  
  get paginatedStudents() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredStudents.slice(startIndex, endIndex);
  }

  getAllStudent() {
    this.http.get("https://localhost:7262/GetAllStudents").subscribe({
      next: (result: any) => {
        // Sort students by enrollment number in descending order
        this.studentList = result.sort((a: any, b: any) => b.enrollmentNumber - a.enrollmentNumber);
        this.filteredStudents = [...this.studentList];
        this.updatePagination();
        
        // Debug logging for image paths
        console.log('Student data:', this.studentList);
        this.studentList.forEach((student, index) => {
          console.log(`Student ${index + 1} image path:`, student.imagePath);
          console.log(`Full image URL:`, 'https://localhost:7262/' + student.imagePath);
        });
      },
      error: (error) => {
        console.error('Error fetching students:', error);
        this.toastr.error('Failed to fetch students', 'Error');
      }
    });
  }

  handleImageError(event: any) {
    console.log('Image loading error:', event);
    console.log('Failed image URL:', event.target.src);
    // Set a default image if the original fails to load
    event.target.src = 'assets/images/default-profile.png';
  }

  // Search functionality
  onSearch() {
    if (!this.searchTerm.trim()) {
      this.filteredStudents = [...this.studentList];
    } else {
      const searchLower = this.searchTerm.toLowerCase().trim();
      this.filteredStudents = this.studentList.filter(student => 
        student.studentName.toLowerCase().includes(searchLower) ||
        student.enrollmentNumber.toString().includes(searchLower)
      );
    }
    this.currentPage = 1; // Reset to first page when searching
    this.updatePagination();
  }

  private updatePagination() {
    this.totalItems = this.filteredStudents.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  // Pagination methods
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  downloadAdmissionReceipt(enrollmentNumber: number) {
    const url = `https://localhost:7262/GetAdmissionReceiptPdf/${enrollmentNumber}`;
    
    this.http.get(url, { responseType: 'blob' }).subscribe(
      (blob: Blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = `AdmissionFeeReceipt_${enrollmentNumber}.pdf`;
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      error => {
        this.toastr.error('Failed to download the receipt.', 'Error');
      }
    );
  }

  downloadAdmissionFeeReceipt(enrollmentNumber: number) {
    const url = `https://localhost:7262/api/AdmissionFee/GenerateAdmissionFeeReceipt/${enrollmentNumber}`;
    
    this.http.get(url, { responseType: 'blob' }).subscribe(
      (blob: Blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = `AdmissionFeeReceipt_${enrollmentNumber}.pdf`;
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      error => {
        this.toastr.error('Failed to download the receipt.', 'Error');
      }
    );
  }

  getImageUrl(imagePath: string): string {
    if (!imagePath) {
      console.log('No image path provided');
      return 'assets/images/default-profile.png';
    }
    
    // Remove any leading slashes
    const cleanPath = imagePath.replace(/^\/+/, '');
    const fullUrl = `https://localhost:7262/${cleanPath}`;
    console.log('Generated image URL:', fullUrl);
    return fullUrl;
  }

  ngOnInit(): void {
    
  }
}
