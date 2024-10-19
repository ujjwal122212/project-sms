import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentRegistrationService } from '../../../Services/student-registration.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-admission',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './student-admission.component.html',
  styleUrl: './student-admission.component.css'
})
export class StudentAdmissionComponent implements OnInit {
  regForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder) { }
  regService = inject(StudentRegistrationService);
  route = inject(Router);
  Classes: any[] = [];
  Sections: any[] = [];
  State: any[] = [];
  District: any[] = [];
  genderArray: string[] = ['Male', 'Female', 'Others'];
  openregform() {
    const stuform = document.getElementById('formModel');
    if (stuform != null) {
      // stuform.classList.add('openform');
    }
  }
  CloseModel() {
    this.route.navigateByUrl('/viewstudentadmission');
    this.setregformstate();
    this.selectedClass = 0;
    this.selectedStateId = 0;
    this.Sections = [];
    this.District = [];
    const stuform = document.getElementById('formModel');
    if (stuform != null) {
      // stuform.classList.remove('openform');
    }

  }
  setregformstate() {
    this.regForm = this.fb.group({
      studentID: [0],
      studentName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      fathersName: ['', Validators.required],
      mothersName: ['', Validators.required],
      fatherOccupation: ['', Validators.required],
      motherOccupation: ['', Validators.required],
      familyIncome: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
      pincode: ['', Validators.required],
      address: ['', Validators.required],
      imagePath: [null],
      class: ['', Validators.required],
      sectionId: [0, Validators.required],
      password: ['Student@123'],
      enrollmentDate: [Date]
    })
  }
  loadClasses() {
    this.regService.getClasses().subscribe((res: any) => {
      this.Classes = res;
      console.log(res);
    })
  }
  selectedClass: number = 0;
  onClassChange(event: any) {
    this.selectedClass = event.target.value;
    this.regForm.patchValue({
      sectionId: 0
    })
    this.Sections = [];
    this.loadSectionBtClasssId(this.selectedClass);
  }
  loadSectionBtClasssId(classId: number) {
    this.regService.getSectionByClassId(classId).subscribe((res: any) => {
      this.Sections = res;
      console.log(this.Sections);
    })
  }
  loadState() {
    this.regService.getStates().subscribe((res: any) => {
      this.State = res;
      console.log(this.State);
    })
  }
  onStateChange(event: any) {
    this.selectedStateId = event.target.value;
    this.regForm.patchValue({
      district: ''
    })
    this.District = [];
    this.loadDistrictByStateId(this.selectedStateId);
  }
  selectedStateId: number = 0;
  loadDistrictByStateId(stateId: number) {
    this.regService.getDistrictByStateId(stateId).subscribe((res: any) => {
      this.District = res;
      console.log(this.District);
    })
  }
  onFileSelected(event: any) {
    const file = event.currentTarget.files[0];
    if (file) {
      this.regForm.patchValue({
        imagePath: file
      });
    }
  }
  @ViewChild('fileInput') fileInput!: ElementRef;
  insertStudent() {
    if (this.regForm.invalid) {
      alert("Please fill all the valid details");
      return;
    }
    else {
      const formdata = new FormData();
      formdata.append('studentName', this.regForm.get('studentName')?.value);
      formdata.append('dateOfBirth', this.regForm.get('dateOfBirth')?.value);
      formdata.append('gender', this.regForm.get('gender')?.value);
      formdata.append('bloodGroup', this.regForm.get('bloodGroup')?.value);
      formdata.append('fathersName', this.regForm.get('fathersName')?.value);
      formdata.append('mothersName', this.regForm.get('mothersName')?.value);
      formdata.append('fatherOccupation', this.regForm.get('fatherOccupation')?.value);
      formdata.append('motherOccupation', this.regForm.get('motherOccupation')?.value);
      formdata.append('familyIncome', this.regForm.get('familyIncome')?.value);
      formdata.append('mobile', this.regForm.get('mobile')?.value);
      formdata.append('email', this.regForm.get('email')?.value);
      formdata.append('state', this.regForm.get('state')?.value);
      formdata.append('district', this.regForm.get('district')?.value);
      formdata.append('pincode', this.regForm.get('pincode')?.value);
      formdata.append('address', this.regForm.get('address')?.value);
      formdata.append('StudentImg', this.regForm.get('imagePath')?.value);
      formdata.append('class', this.regForm.get('class')?.value);
      formdata.append('sectionId', this.regForm.get('sectionId')?.value);
      this.regService.addStudent(formdata).subscribe((res: any) => {
        alert("Student Data Added Successfully");
        this.route.navigateByUrl('/viewstudentadmission');
        this.regForm.reset();
        this.fileInput.nativeElement.value = '';
        this.CloseModel();
      })
    }
  }
  onSubmit() {
    this.insertStudent();
  }
  ngOnInit(): void {
    this.setregformstate();
    this.loadClasses();
    this.loadState();
  }

}
