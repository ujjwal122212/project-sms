import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StudentCourseService } from '../../../Services/student-course.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-class',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-class.component.html',
  styleUrl: './add-class.component.css'
})
export class AddClassComponent {
  toastr = inject(ToastrService);
  classForm: FormGroup;
  studentCourseService = inject(StudentCourseService);
  classes: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5; // Number of items per page

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.classForm = this.fb.group({
      classId: [0],
      className: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses() {
    this.studentCourseService.getClasses().subscribe((response: any) => {
      this.classes = response;
      console.log(this.classes);
    });
  }

  insertClass() {
    if (this.classForm.invalid) {
     this.toastr.error("Please enter all valid details!");

      return;
    }

    const formValue = this.classForm.value;
    console.log('Adding class with data:', formValue);

    this.http.post('https://localhost:7262/Add Classes', formValue).subscribe(
      () => {
        this.toastr.success("Class added successfully");

        this.loadClasses();
        this.classForm.reset();
        this.closeModel();
      },
      (error) => {
        alert('Failed to add class. Please try again.');
      }
    );
  }

  addClass() {
    if (this.classForm.value.classId === 0) {
      this.insertClass();
    } else {
      this.editClass();
    }
  }

  updateClass(id: number) {
    this.openForm();
    this.http.get(`https://localhost:7262/GetClassByID/${id}`).subscribe(
      (res: any) => {
        this.classForm.patchValue({
          classId: res.classId,
          className: res.className,
        });
      },
      (error) => {
        console.error('Error fetching class details:', error);
      }
    );
  }

  editClass() {
    if (this.classForm.invalid) {
      alert('Please fill all the valid details');
      return;
    }
    const formValue = this.classForm.value;
    this.http
      .put(`https://localhost:7262/UpdateClass/${formValue.classId}`, formValue)
      .subscribe(() => {
        alert('Class updated successfully');
        this.loadClasses();
        this.classForm.reset();
        this.closeModel();
      });
  }

  deleteClass(id: any) {
    const isConfirm = confirm('Are you sure you want to delete this class?');
    if (isConfirm) {
      this.http.delete(`https://localhost:7262/DeleteClass/${id}`).subscribe(
        () => {
          alert('Class deleted successfully');
          this.loadClasses();
        },
        (error) => {
          alert('Failed to delete the class. Please try again.');
        }
      );
    }
  }

  openForm(): void {
    const formElement = document.getElementById('formModel');
    if (formElement) {
      formElement.classList.add('openform');
    }
  }

  closeModel(): void {
    this.classForm.reset();
    this.classForm.patchValue({ classId: 0 });
    const formElement = document.getElementById('formModel');
    if (formElement) {
      formElement.classList.remove('openform');
    }
  }

  // Pagination logic
  get paginatedClasses() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.classes.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.classes.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
