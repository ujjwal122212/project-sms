
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentRegistrationService } from '../../../Services/student-registration.service';
import { CommonModule } from '@angular/common';

import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  Classes: any[] = [];
  Sections: any[] = [];
  State: any[] = [];
  District: any[] = [];
  genderArray: string[] = ['Male', 'Female', 'Others'];
  openregform() {
    const stuform = document.getElementById('formModel');
    if (stuform != null) {
      stuform.classList.add('openform');
    }
  }
  CloseModel() {
    this.setregformstate();
    this.selectedClass=0;
    this.selectedStateId=0;
    this.Sections=[];
    this.District=[];
    const stuform = document.getElementById('formModel');
    if (stuform != null) {
      stuform.classList.remove('openform');
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
      sectionId:0
    })
    this.Sections=[];
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
      district:''
    })
    this.District=[];
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

  toastr=inject(ToastrService)
  router=inject(Router)

  StateId:string='';
  StateList:any[]=[];
  DistrictList:any[]=[];
  StudentName = '';
  DateOfBirth = '';
  Gender = '';
  BloodGroup = '';
  FathersName = '';
  MothersName = '';
  FatherOccupation = '';
  MotherOccupation = '';
  FamilyIncome = '';
  Mobile = '';
  Email = '';
  State = '';
  District = '';
  Pincode = '';
  Address = '';
  StudentImg: File | null = null;
  Class = '';
  Section = '';
  message: string = '';


  constructor(private http: HttpClient) {
    this.getState();
  }
  getState(){
    this.http.get("https://localhost:7262/api/State").subscribe((result: any) => {

      this.StateList = result;

    })
  }

  getDistrictById(){
    this.http.get("https://localhost:7262/api/District/"+this.StateId).subscribe((result: any) => {

      this.DistrictList = result;

    })
  }


  private apiUrl = 'https://localhost:7262/api/RegisterStudent/register';
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.StudentImg = file;
    }
  }

  onSubmit(): void {
    if (!this.StudentImg) {
      this.message = 'Please select an image.';
      return;
    }
    const formData = new FormData();
    formData.append('StudentName', this.StudentName);
    formData.append('DateOfBirth', this.DateOfBirth);
    formData.append('Gender', this.Gender);
    formData.append('BloodGroup', this.BloodGroup);
    formData.append('FathersName', this.FathersName);
    formData.append('MothersName', this.MothersName);
    formData.append('FatherOccupation', this.FatherOccupation);
    formData.append('MotherOccupation', this.MotherOccupation);
    formData.append('FamilyIncome', this.FamilyIncome);
    formData.append('Mobile', this.Mobile);
    formData.append('Email', this.Email);
    formData.append('State', this.State);
    formData.append('District', this.District);
    formData.append('Pincode', this.Pincode);
    formData.append('Address', this.Address);
    formData.append('StudentImg', this.StudentImg);
    formData.append('Class', this.Class);
    formData.append('Section', this.Section);



    this.http.post<any>(this.apiUrl, formData).subscribe(
      (response) => {
        this.message = 'created successfully!';
        this.toastr.success('Student Added Succesfully');
        this.router.navigateByUrl("/viewstudent")
      },
      (error: HttpErrorResponse) => {
        this.message = `Error: ${error.message}`;
        this.toastr.warning('Someting is wrong');
      }
    );
}

}
