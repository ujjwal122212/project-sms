import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentRegistrationService } from '../../../Services/student-registration.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  http = inject(HttpClient);
  activatedRoute = inject(ActivatedRoute);

  regForm!: FormGroup;
  selectedClass = 0;
  selectedStateId = 0;
  Classes: any[] = [];
  Sections: any[] = [];
  State: any[] = [];
  District: any[] = [];
  genderArray: string[] = ['Male', 'Female', 'Others'];
  acadmicYear: any[] = [];
  enrollmentNumber!: number;
  isEdit = false;

  folderMap: { [key: string]: string } = {
    StudentImg: 'Student_images',
    studentAadharImg: 'AadharImages',
    studentBirthCertificate: 'BirthCertificates'
  };

  @ViewChild('studentImgInput') studentImgInput!: ElementRef;
  @ViewChild('aadharImgInput') aadharImgInput!: ElementRef;
  @ViewChild('birthCertificateInput') birthCertificateInput!: ElementRef;

  ngOnInit(): void {
    this.setRegFormState();
    this.loadClasses();
    this.loadState();
    this.getAcadmicYear();
    this.updation();
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
      StudentImg: [null, Validators.required],
      studentAadharImg: [null, Validators.required],
      studentBirthCertificate: [null, Validators.required],
      class: ['', Validators.required],
      sectionId: [0, Validators.required],
      password: ['Student@123'],
      enrollmentDate: [new Date()]
    });
  }

  onFileSelect(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.regForm.patchValue({ [controlName]: file });
      this.regForm.get(controlName)?.updateValueAndValidity();
      this.formDatService.setStudentData({
        ...this.formDatService.studentDataSubject.getValue(),
        [controlName]: file
      });
    }
  }

  loadClasses() {
    this.regService.getClasses().subscribe(res => this.Classes = res as any[]);
  }

  loadState() {
    this.regService.getStates().subscribe(res => this.State = res as any[]);
  }

  onClassChange(event: any) {
    const classId = event.target.value;
    this.selectedClass = classId;
    this.Sections = [];
    this.loadSectionBtClasssId(classId);
    this.regForm.patchValue({ sectionId: 0 });
  }

  loadSectionBtClasssId(classId: number) {
    this.regService.getSectionByClassId(classId).subscribe(res => this.Sections = res as any[]);
  }

  onStateChange(event: any) {
    const stateId = event.target.value;
    this.selectedStateId = stateId;
    this.District = [];
    this.loadDistrictByStateId(stateId);
    this.regForm.patchValue({ district: '' });
  }

  loadDistrictByStateId(stateId: number) {
    this.regService.getDistrictByStateId(stateId).subscribe(res => this.District = res as any[]);
  }

  getAcadmicYear() {
    this.http.get('https://localhost:7262/GetAcedmicYear').subscribe(res => {
      this.acadmicYear = res as any[];
    });
  }

  async updation() {
  this.enrollmentNumber = this.activatedRoute.snapshot.params['studentID'];
  if (!this.enrollmentNumber) return;

  this.isEdit = true;

  this.regService.getStudentByStudentID(this.enrollmentNumber).subscribe(async (result: any) => {
    // Convert full datetime to date string
    const formatDate = (dateString: string) => dateString ? new Date(dateString).toISOString().split('T')[0] : '';

    // Patch student form
    this.regForm.patchValue({
      enrollmentNumber: result.enrollmentNumber,
      studentName: result.studentName,
      dateOfBirth: formatDate(result.dateOfBirth),
      gender: result.gender,
      bloodGroup: result.bloodGroup,
      caste: result.caste,
      academicYear: result.academicYear,
      mobile: result.mobile,
      alternateMobile: result.alternateMobile,
      email: result.email,
      state: result.state,
      district: result.district,
      pincode: result.pincode,
      address: result.address,
      class: result.class,
      sectionId: result.sectionId,
      password: result.password,
      enrollmentDate: formatDate(result.enrollmentDate)
    });

    // Set student data in shared service
    this.formDatService.setStudentData({ ...this.regForm.value, isEdit: true });
    console.log('✅ Student data sent to service:', this.regForm.value);

    // Set parent data in shared service
    const parentData = {
      fathersName: result.fathersName || '',
      mothersName: result.mothersName || '',
      fatherOccupation: result.fatherOccupation || '',
      motherOccupation: result.motherOccupation || '',
      familyIncome: result.familyIncome || '',
      fathersDOB: formatDate(result.fathersDOB),
      mothersDOB: formatDate(result.mothersDOB),
      fathersImg: result.fathersImg || '',
      fathersDocumentImg: result.fathersDocumentImg || '',
      mothersImg: result.mothersImg || '',
      mothersDocumentImg: result.mothersDocumentImg || ''
    };

    this.formDatService.setParentData(parentData);
    console.log('✅ Parent data sent to service:', parentData);

    // Trigger dropdowns after setting class/state
    this.onStateChange({ target: { value: result.state } });
    this.onClassChange({ target: { value: result.class } });

    setTimeout(() => {
      this.regForm.patchValue({
        district: result.district,
        sectionId: result.sectionId
      });
    }, 500);

    // Patch image files
    const imageFields = [
      { path: result.imagePath, controlName: 'StudentImg', filename: 'student.jpg', input: this.studentImgInput },
      { path: result.studentAadharImg, controlName: 'studentAadharImg', filename: 'aadhar.jpg', input: this.aadharImgInput },
      { path: result.studentBirthCertificate, controlName: 'studentBirthCertificate', filename: 'birth.jpg', input: this.birthCertificateInput }
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
        } catch (err) {
          this.toastr.error(`Failed to load image: ${field.controlName}`, 'Error');
        }
      }
    }

    console.log('📋 Final patched form value:', this.regForm.value);
  });
}


  convertImagePathToFile(imagePath: string, filename: string, controlName: string): Promise<File> {
    const folder = this.folderMap[controlName];
    const fullUrl = `https://localhost:7262/api/Image/${folder}/${imagePath}`;
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

  insertStudent() {
    if (this.regForm.invalid) {
      this.toastr.error('Fill all required fields');
      return;
    }
    this.formDatService.setStudentData({ ...this.regForm.value, isEdit: false });
    this.route.navigate(['/adminlayout/parentInfo']);
  }

  Editing() {
    if (this.regForm.invalid) {
      this.toastr.error('Fill all required fields');
      return;
    }
    this.formDatService.setStudentData({ ...this.regForm.value, isEdit: true });
    this.route.navigate(['/adminlayout/parentInfo']);
  }

  onSubmit() {
    this.isEdit ? this.Editing() : this.insertStudent();
  }

  CloseModel() {
    this.route.navigateByUrl('/adminlayout/viewstudentadmission');
    this.setRegFormState();
    this.selectedClass = 0;
    this.selectedStateId = 0;
    this.Sections = [];
    this.District = [];
  }
}
