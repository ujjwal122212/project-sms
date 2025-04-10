import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StudentAdmissionService } from '../../../Services/student-admission.service';
import { StudentRegistrationService } from '../../../Services/student-registration.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-parent-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './parent-info.component.html',
  styleUrl: './parent-info.component.css',
})
export class ParentInfoComponent implements OnInit {
  toastr = inject(ToastrService);
  parentForm!: FormGroup;
  fb = inject(FormBuilder);
  studentInfo = inject(StudentAdmissionService);
  registerStudent = inject(StudentRegistrationService);
  route = inject(Router);
  studentData: any = {};

  ngOnInit(): void {
    this.studentInfo.studentData$.subscribe((data) => {
      if (data) {
        this.studentData = data;
        console.log(this.studentData);
      }
    });
    this.setParentFormState();
  }

  setParentFormState() {
    this.parentForm = this.fb.group({
      fathersName: ['', Validators.required],
      mothersName: ['', Validators.required],
      fatherOccupation: ['', Validators.required],
      motherOccupation: ['', Validators.required],
      familyIncome: ['', Validators.required],
      fathersDOB: ['', Validators.required],
      mothersDOB: ['', Validators.required],
      fathersImg: [null, Validators.required],
      fathersDocumentImg: [null, Validators.required],
      mothersImg: [null, Validators.required],
      mothersDocumentImg: [null, Validators.required],
    });
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.parentForm.patchValue({
        [controlName]: file,
      });
      this.parentForm.get(controlName)?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.parentForm.invalid) {
      this.toastr.error(
        'Please fill in all required fields',
        'Validation Error'
      );
      return;
    }

    const formData = new FormData();

    // Appending student form data
    Object.keys(this.studentData).forEach((key) => {
      if (this.studentData[key] instanceof File) {
        formData.append(key, this.studentData[key]);
      } else {
        formData.append(key, this.studentData[key].toString());
      }
    });

    // Appending parent form data
    Object.keys(this.parentForm.value).forEach((key) => {
      if (this.parentForm.value[key] instanceof File) {
        formData.append(key, this.parentForm.value[key]);
      } else {
        formData.append(key, this.parentForm.value[key]);
      }
    });

    this.registerStudent.addStudent(formData).subscribe({
      next: () => {
        this.toastr.success('Student registered successfully', 'Success');
        this.route.navigate(['/adminlayout/viewAllStudent']);
      },
      error: () => {
        this.toastr.error('Error occurred while registering student', 'Error');
      },
    });
  }
}
