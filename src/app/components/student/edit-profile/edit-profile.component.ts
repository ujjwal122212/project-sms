// edit-profile.component.ts
import { Component, OnInit, inject, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentRegistrationService } from '../../../Services/student-registration.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  regForm!: FormGroup;
  genderArray: string[] = ['Male', 'Female', 'Others'];
  Classes: any[] = [];
  Sections: any[] = [];
  State: any[] = [];
  District: any[] = [];
  selectedClass = 0;
  selectedStateId = 0;
  isEdit = false;
  enrollmentNumber!: number;

  folderMap: { [key: string]: string } = {
    StudentImg: 'Student_images',
    studentAadharImg: 'AadharImages',
    studentBirthCertificate: 'BirthCertificates',
    fathersImg: 'FathersImages',
    fathersDocumentImg: 'FathersDocuments',
    mothersImg: 'MothersImages',
    mothersDocumentImg: 'MothersDocuments'
  };

  @ViewChild('studentImgInput') studentImgInput!: ElementRef;
  @ViewChild('aadharImgInput') aadharImgInput!: ElementRef;
  @ViewChild('birthCertificateInput') birthCertificateInput!: ElementRef;
  @ViewChild('fathersImgInput') fathersImgInput!: ElementRef;
  @ViewChild('fathersDocumentInput') fathersDocumentInput!: ElementRef;
  @ViewChild('mothersImgInput') mothersImgInput!: ElementRef;
  @ViewChild('mothersDocumentInput') mothersDocumentInput!: ElementRef;

  toastr = inject(ToastrService);
  fb = inject(FormBuilder);
  regService = inject(StudentRegistrationService);
  route = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  http = inject(HttpClient);

  ngOnInit(): void {
    this.setregformstate();
    this.loadClasses();
    this.loadState();
    this.updation();
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
      alternateMobile: [''],
      email: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
      pincode: ['', Validators.required],
      address: ['', Validators.required],
      StudentImg: [null],
      studentAadharImg: [null],
      studentBirthCertificate: [null],
      fathersImg: [null],
      fathersDocumentImg: [null],
      mothersImg: [null],
      mothersDocumentImg: [null],
      class: ['', Validators.required],
      sectionId: [0, Validators.required],
      section: [''],
      password: ['Student@123'],
      enrollmentDate: [new Date().toISOString()],
      caste: ['', Validators.required],
    });
  }

  async updation() {
    this.enrollmentNumber = this.activatedRoute.snapshot.params['enrollmentNumber'];
    if (!this.enrollmentNumber) return;

    this.isEdit = true;
    this.regService.getStudentByStudentID(this.enrollmentNumber).subscribe(async (result: any) => {
      const formatDate = (dateString: string) => dateString ? new Date(dateString).toISOString().split('T')[0] : '';

      this.regForm.patchValue({
        enrollmentNumber: result.enrollmentNumber,
        studentName: result.studentName,
        dateOfBirth: formatDate(result.dateOfBirth),
        gender: result.gender,
        bloodGroup: result.bloodGroup,
        fathersName: result.fathersName,
        mothersName: result.mothersName,
        fatherOccupation: result.fatherOccupation,
        motherOccupation: result.motherOccupation,
        familyIncome: result.familyIncome,
        mobile: result.mobile,
        alternateMobile: result.alternateMobile,
        email: result.email,
        state: result.state,
        district: result.district,
        pincode: result.pincode,
        address: result.address,
        class: result.class,
        sectionId: result.sectionId,
        section: result.section,
        password: result.password,
        caste: result.caste,
        enrollmentDate: formatDate(result.enrollmentDate)
      });

      this.onStateChange({ target: { value: result.state } });
      this.onClassChange({ target: { value: result.class } });

      setTimeout(() => {
        this.regForm.patchValue({
          district: result.district,
          sectionId: result.sectionId
        });
      }, 500);

      this.regForm.get('class')?.disable();
      this.regForm.get('sectionId')?.disable();
      this.regForm.get('email')?.disable();
      this.regForm.get('fathersName')?.disable();
      this.regForm.get('mothersName')?.disable();
      this.regForm.get('studentName')?.disable();
      this.regForm.get('dateOfBirth')?.disable();
      this.regForm.get('gender')?.disable();
      this.regForm.get('bloodGroup')?.disable();

      const imageFields = [
        { path: result.imagePath, controlName: 'StudentImg', filename: 'student.jpg', input: this.studentImgInput },
        { path: result.studentAadharImg, controlName: 'studentAadharImg', filename: 'aadhar.jpg', input: this.aadharImgInput },
        { path: result.studentBirthCertificate, controlName: 'studentBirthCertificate', filename: 'birth.jpg', input: this.birthCertificateInput },
        { path: result.fathersImg, controlName: 'fathersImg', filename: 'fathers.jpg', input: this.fathersImgInput },
        { path: result.fathersDocumentImg, controlName: 'fathersDocumentImg', filename: 'fathersdoc.jpg', input: this.fathersDocumentInput },
        { path: result.mothersImg, controlName: 'mothersImg', filename: 'mothers.jpg', input: this.mothersImgInput },
        { path: result.mothersDocumentImg, controlName: 'mothersDocumentImg', filename: 'mothersdoc.jpg', input: this.mothersDocumentInput }
      ];

      for (const field of imageFields) {
        if (field.path) {
          try {
            const file = await this.convertImagePathToFile(field.path, field.filename, field.controlName);
            this.regForm.patchValue({ [field.controlName]: file });
            this.regForm.get(field.controlName)?.updateValueAndValidity();
            if (field.input?.nativeElement) {
              field.input.nativeElement.files = this.createFileList(file);
            }
          } catch {
            this.toastr.error(`Failed to load image: ${field.controlName}`, 'Error');
          }
        }
      }
    });
  }

  convertImagePathToFile(imagePath: string, filename: string, controlName: string): Promise<File> {
    const folder = this.folderMap[controlName];
    const fullUrl = imagePath.startsWith('http') ? imagePath : `https://localhost:7262/api/Image/${folder}/${imagePath}`;
    return fetch(fullUrl)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch image');
        return response.blob();
      })
      .then(blob => new File([blob], filename, { type: blob.type }));
  }

  createFileList(file: File): FileList {
    const dt = new DataTransfer();
    dt.items.add(file);
    return dt.files;
  }

  updateStudent() {
    if (this.regForm.invalid) {
      this.toastr.warning('Please fill all required fields');
      return;
    }
    const formData = new FormData();
    Object.keys(this.regForm.controls).forEach(key => {
      const control = this.regForm.get(key);
      if (control && control.value) {
        formData.append(key, control.value);
      }
    });
    const id = this.regForm.get('enrollmentNumber')?.value;
    this.regService.UpdateStudentByStudentID(id, formData).subscribe(() => {
      this.toastr.success('Updated Successfully');
      this.CloseModel();
    });
  }

  CloseModel() {
    this.route.navigateByUrl('/studentlayout/studentprofile');
  }
  loadClasses() {
    this.regService.getClasses().subscribe((res: any) => {
      this.Classes = res;
      console.log(res);
    })
  }
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
  loadDistrictByStateId(stateId: number) {
    this.regService.getDistrictByStateId(stateId).subscribe((res: any) => {
      this.District = res;
      console.log(this.District);
    })
  }
  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.regForm.patchValue({ [controlName]: file });
      this.regForm.get(controlName)?.updateValueAndValidity();
    }
  }


  onSubmit() {
    this.updateStudent();
  }
}
