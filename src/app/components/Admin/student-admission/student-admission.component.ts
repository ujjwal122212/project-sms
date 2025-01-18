import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentRegistrationService } from '../../../Services/student-registration.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-admission',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './student-admission.component.html',
  styleUrl: './student-admission.component.css'
})
export class StudentAdmissionComponent implements OnInit {
   toastr = inject(ToastrService);
  regForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder) { }
  regService = inject(StudentRegistrationService);
  route = inject(Router);
  Classes: any[] = [];
  Sections: any[] = [];
  State: any[] = [];
  District: any[] = [];
  genderArray: string[] = ['Male', 'Female', 'Others'];
  // openregform() {
  //   const stuform = document.getElementById('formModel');
  //   if (stuform != null) {
  //     // stuform.classList.add('openform');
  //   }
  // }
  CloseModel() {
    this.route.navigateByUrl('/adminlayout/viewstudentadmission');
    this.setregformstate();
    this.selectedClass = 0;
    this.selectedStateId = 0;
    this.Sections = [];
    this.District = [];
    // const stuform = document.getElementById('formModel');
    // if (stuform != null) {
    //   stuform.classList.remove('openform');
    // }
  }
  setregformstate() {
    this.regForm = this.fb.group({
      enrollmentNumber: [0],
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
  imagePreview: string | ArrayBuffer | null = null;
  onFileSelected(event: any) {
    const file = event.currentTarget.files[0];
    if (file) {
      this.regForm.patchValue({
        imagePath: file
      });
      this.regForm.get('imagePath')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  @ViewChild('fileInput') fileInput!: ElementRef;
  insertStudent() {
    if (this.regForm.invalid) {
      this.toastr.warning("Please fill all the valid details");
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
        this.toastr.success("Student Data Added Successfully");
        this.route.navigateByUrl('/viewstudentadmission');
        this.regForm.reset();
        this.fileInput.nativeElement.value = '';
        this.CloseModel();
      })
    }
  }

  async patchImagePathToForm(imagePath: string) {
    const file = await this.convertImagePathToFile(imagePath, 'studentImage.jpg');

    this.regForm.patchValue({
      imagePath: file
    });
    const inputFileElement = this.fileInput.nativeElement;
    const fileList: FileList = this.createFileList(file);
    inputFileElement.files = fileList;
  }


  baseImageUrl: string = 'https://localhost:7262/api/Image/';
  convertImagePathToFile(imagePath: string, filename: string): Promise<File> {
    const fullImageUrl = `${this.baseImageUrl}${imagePath}`;

    return fetch(fullImageUrl)
      .then(response => response.blob())
      .then(blob => {
        return new File([blob], filename, { type: blob.type });
      });
  }

  createFileList(file: File): FileList {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    return dataTransfer.files;
  }




  activatedRoute = inject(ActivatedRoute);
  studentID!: number;
  isEdit = false;
  image!: string;
  async updation() {
    this.studentID = this.activatedRoute.snapshot.params['studentID'];
    if (this.studentID) {
      this.isEdit = true;
      this.regService.getStudentByStudentID(this.studentID).subscribe(async (result: any) => {
        console.log("Student result of id ", result);
        this.image = result.imagePath
        this.regForm.patchValue(result);
        if (result.dateOfBirth) {
          const dateObj = new Date(result.dateOfBirth);
          const formattedDate = dateObj.toISOString().split('T')[0];
          result.dateOfBirth = formattedDate;
        }
        this.regForm.patchValue({
          dateOfBirth: result.dateOfBirth
        });
        this.onClassChange({ target: { value: result.class } });
        setTimeout(() => {
          this.regForm.patchValue({
            sectionId: result.sectionId
          });
        }, 500);
        this.onStateChange({ target: { value: result.state } });
        setTimeout(() => {
          this.regForm.patchValue({
            district: result.district
          });
        }, 500);
        const responseImage = result.imagePath;
        await this.patchImagePathToForm(responseImage);
        console.log("Form Value now", this.regForm.value);
      })
    }
  }
  updateStudent() {
    if (this.regForm.invalid) {
      this.toastr.warning("Please fill all the valid details");
      return;
    }
    else {
      const formdata = new FormData();
      const enrollmentNumber = this.regForm.get('enrollmentNumber')?.value;
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
      this.regService.UpdateStudentByStudentID(enrollmentNumber, formdata).subscribe((res: any) => {
        this.toastr.success("Student Data Updated Successfully");
        this.route.navigateByUrl('/viewstudentadmission');
        this.regForm.reset();
        this.fileInput.nativeElement.value = '';
        this.CloseModel();
      })
    }
  }
  onSubmit() {
    if (this.isEdit) {
      this.updateStudent();
    }
    else {
      this.insertStudent();
    }
  }
  ngOnInit(): void {
    this.setregformstate();
    this.updation();
    this.loadClasses();
    this.loadState();
  }

}
