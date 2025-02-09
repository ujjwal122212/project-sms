import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentRegistrationService } from '../../../Services/student-registration.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentAdmissionService } from '../../../Services/student-admission.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-admission',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './student-admission.component.html',
  styleUrl: './student-admission.component.css'
})
export class StudentAdmissionComponent implements OnInit {
  toastr = inject(ToastrService);
  fb = inject(FormBuilder);
  regService = inject(StudentRegistrationService);
  route = inject(Router);
  formDatService = inject(StudentAdmissionService);

  regForm!: FormGroup;
  selectedClass: number = 0;
  selectedStateId: number = 0;
  Classes: any[] = [];
  Sections: any[] = [];
  State: any[] = [];
  District: any[] = [];
  genderArray: string[] = ['Male', 'Female', 'Others'];
  ngOnInit(): void {
    this.setRegFormState();
    this.loadClasses();
    this.loadState();
    this.getAcadmicYear();
  }

  // getAcadmic Year
  http = inject(HttpClient)
  acadmicYear: any[] = [];
  getAcadmicYear() {
    this.http.get('https://localhost:7262/GetAcedmicYear').subscribe((res: any) => {
      this.acadmicYear = res;
      console.log(res);
    })
  }


  CloseModel() {
    this.route.navigateByUrl('/adminlayout/viewstudentadmission');
    this.setRegFormState();
    this.selectedClass = 0;
    this.selectedStateId = 0;
    this.Sections = [];
    this.District = [];
  }
  setRegFormState() {
    this.regForm = this.fb.group({
      enrollmentNumber: [0],
      studentName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      caste: ['', Validators.required],
      academicYear: ['', Validators.required],
      mobile: ['', Validators.required],
      alternateMobile: ['', Validators.required],
      email: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
      pincode: ['', Validators.required],
      address: ['', Validators.required],
      StudentImg: [null,Validators.required], 
      studentAadharImg: [null,Validators.required],
      studentBirthCertificate: [null,Validators.required],
      class: ['', Validators.required],
      sectionId: [0, Validators.required],
      password: ['Student@123'],
      enrollmentDate: [new Date()]
    });
  }

  onFileSelect(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.regForm.patchValue({
        [controlName]: file
      });
      this.regForm.get(controlName)?.updateValueAndValidity();
    }
  }

  loadClasses() {
    this.regService.getClasses().subscribe((res: any) => {
      this.Classes = res;
    });
  }

  onClassChange(event: any) {
    this.selectedClass = event.target.value;
    this.regForm.patchValue({ sectionId: 0 });
    this.Sections = [];
    this.loadSectionBtClasssId(this.selectedClass);
  }

  loadSectionBtClasssId(classId: number) {
    this.regService.getSectionByClassId(classId).subscribe((res: any) => {
      this.Sections = res;
    });
  }

  loadState() {
    this.regService.getStates().subscribe((res: any) => {
      this.State = res;
    });
  }

  onStateChange(event: any) {
    this.selectedStateId = event.target.value;
    this.regForm.patchValue({ district: '' });
    this.District = [];
    this.loadDistrictByStateId(this.selectedStateId);
  }

  loadDistrictByStateId(stateId: number) {
    this.regService.getDistrictByStateId(stateId).subscribe((res: any) => {
      this.District = res;
    });
  }

  insertStudent() {
    if (this.regForm.invalid) {
      this.toastr.error('Please fill in all required fields', 'Validation Error');
      return;
    }

    this.formDatService.setStudentData(this.regForm.value);
    this.route.navigate(['/adminlayout/parentInfo']);
  }

  onSubmit() {
    this.insertStudent();
  }
}
