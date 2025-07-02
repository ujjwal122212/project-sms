import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { StudentAdmissionService } from '../../../Services/student-admission.service';
import { StudentRegistrationService } from '../../../Services/student-registration.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, Observable } from 'rxjs';

interface StudentResponse {
  enrollmentNumber: number;
  studentName: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  fathersName: string;
  mothersName: string;
  fatherOccupation: string;
  motherOccupation: string;
  familyIncome: number;
  mobile: string;
  alternateMobile: string;
  email: string;
  state: string;
  district: string;
  pincode: string;
  address: string;
  imagePath: string;
  class: string;
  sectionId: number;
  password: string;
  enrollmentDate: string;
  caste: string;
  academicYear: number;
  fathersDOB: string;
  mothersDOB: string;
  studentBirthCertificate: string;
  studentAadharImg: string;
  fathersImg: string;
  fathersDocumentImg: string;
  mothersImg: string;
  mothersDocumentImg: string;
}

@Component({
  selector: 'app-parent-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './parent-info.component.html',
  styleUrl: './parent-info.component.css'
})
export class ParentInfoComponent implements OnInit, AfterViewInit {
  toastr = inject(ToastrService);
  fb = inject(FormBuilder);
  studentInfo = inject(StudentAdmissionService);
  registerStudent = inject(StudentRegistrationService);
  route = inject(Router);

  parentForm!: FormGroup;
  studentData: any = null;
  apiResponse: StudentResponse | null = null;
  isViewInitialized = false;
  isEdit = false;

  baseImageUrl: { [key: string]: string } = {
    fathersImg: 'https://localhost:7262/api/Image/FathersImages/',
    fathersDocumentImg: 'https://localhost:7262/api/Image/FathersDocuments/',
    mothersImg: 'https://localhost:7262/api/Image/MothersImages/',
    mothersDocumentImg: 'https://localhost:7262/api/Image/MothersDocuments/'
  };

  @ViewChild('fathersImgInput') fathersImgInput!: ElementRef;
  @ViewChild('fathersDocumentImgInput') fathersDocumentImgInput!: ElementRef;
  @ViewChild('mothersImgInput') mothersImgInput!: ElementRef;
  @ViewChild('mothersDocumentImgInput') mothersDocumentImgInput!: ElementRef;

  ngOnInit(): void {
    this.setParentFormState();
    this.loadStudentData();
    this.loadParentData();
  }

  ngAfterViewInit(): void {
    this.isViewInitialized = true;
    if (this.apiResponse) {
      this.patchImages();
    }
  }

  setParentFormState() {
    this.parentForm = this.fb.group({
      studentId: [0],
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
      mothersDocumentImg: [null, Validators.required]
    });
  }

  loadStudentData() {
    this.studentInfo.studentData$.subscribe((data) => {
      if (data) {
        this.studentData = data;
        this.isEdit = data.isEdit || false;
        console.log(' Student data loaded:', this.studentData);

        this.parentForm.patchValue({
          studentId: this.studentData.enrollmentNumber || 0
        });
      } else {
        this.toastr.error('No student data found', 'Error');
        this.route.navigate(['/adminlayout/viewstudentadmission']);
      }
    });
  }

  async loadParentData() {
    this.studentInfo.parentData$.subscribe(async (data) => {
      if (data) {
        console.log(' Parent data from service:', data);

        this.parentForm.patchValue({
          fathersName: data.fathersName || '',
          mothersName: data.mothersName || '',
          fatherOccupation: data.fatherOccupation || '',
          motherOccupation: data.motherOccupation || '',
          familyIncome: data.familyIncome || '',
          fathersDOB: data.fathersDOB || '',
          mothersDOB: data.mothersDOB || ''
        });

        

        if (this.isEdit && this.studentData?.enrollmentNumber) {
          try {
            this.apiResponse = await firstValueFrom(
              this.registerStudent.getStudentByStudentID(this.studentData.enrollmentNumber) as Observable<StudentResponse>
            );

            

            if (this.apiResponse && this.isViewInitialized) {
              await this.patchImages();
              
            }
          } catch (error) {
            
            this.toastr.error('Failed to load parent data', 'Error');
          }
        }
      }
    });
  }

  async patchImages() {
    if (!this.apiResponse) return;

    const imageFields = [
      {
        path: this.apiResponse.fathersImg,
        controlName: 'fathersImg',
        filename: 'FathersImg.jpg',
        input: this.fathersImgInput
      },
      {
        path: this.apiResponse.fathersDocumentImg,
        controlName: 'fathersDocumentImg',
        filename: 'FathersDocumentImg.pdf',
        input: this.fathersDocumentImgInput
      },
      {
        path: this.apiResponse.mothersImg,
        controlName: 'mothersImg',
        filename: 'MothersImg.jpg',
        input: this.mothersImgInput
      },
      {
        path: this.apiResponse.mothersDocumentImg,
        controlName: 'mothersDocumentImg',
        filename: 'MothersDocumentImg.pdf',
        input: this.mothersDocumentImgInput
      }
    ];

    for (const field of imageFields) {
      if (field.path) {
        await this.patchImageToForm(field.path, field.controlName, field.filename, field.input);
      } else {
        console.warn(`Missing image path for ${field.controlName}`);
      }
    }
  }

  async patchImageToForm(imagePath: string, controlName: string, filename: string, inputElement: ElementRef) {
    try {
      const file = await this.convertImagePathToFile(imagePath, filename, controlName);
      this.parentForm.patchValue({ [controlName]: file });
      this.parentForm.get(controlName)?.updateValueAndValidity();
      if (inputElement?.nativeElement) {
        inputElement.nativeElement.files = this.createFileList(file);
        console.log(` ${controlName} patched:`, file.name, '| size:', file.size);
      }
    } catch (error) {
      console.error(` Error patching image ${controlName}:`, error);
      this.toastr.error(`Failed to load ${controlName}`, 'Error');
    }
  }

  convertImagePathToFile(imagePath: string, filename: string, controlName: string): Promise<File> {
    const baseUrl = this.baseImageUrl[controlName] || 'https://localhost:7262/api/Image/';
    const fullImageUrl = `${baseUrl}${imagePath}`;
    console.log(` Fetching image from: ${fullImageUrl}`);

    return fetch(fullImageUrl)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch image');
        return response.blob();
      })
      .then((blob) => new File([blob], filename, { type: blob.type }));
  }

  createFileList(file: File): FileList {
    const dt = new DataTransfer();
    dt.items.add(file);
    return dt.files;
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        this.toastr.error('File size exceeds 5MB');
        return;
      }
      this.parentForm.patchValue({ [controlName]: file });
      this.parentForm.get(controlName)?.updateValueAndValidity();
      console.log(` Manually selected ${controlName}:`, file.name);
    }
  }

  onSubmit() {
    if (this.parentForm.invalid) {
      this.toastr.error('Please fill in all required fields');
      return;
    }

    if (!this.studentData) {
      this.toastr.error('Missing student data');
      return;
    }

    const formData = new FormData();

    // Student data
    Object.keys(this.studentData).forEach((key) => {
      if (key !== 'isEdit' && this.studentData[key] instanceof File) {
        formData.append(key, this.studentData[key], this.studentData[key].name);
      } else if (this.studentData[key] != null) {
        formData.append(key, this.studentData[key].toString());
      }
    });

    // Parent form data
    Object.keys(this.parentForm.value).forEach((key) => {
      const val = this.parentForm.value[key];
      if (val instanceof File) {
        formData.append(key, val, val.name);
      } else if (val != null) {
        formData.append(key, val.toString());
      }
    });

    console.log(' Final FormData:', this.parentForm.value);

    if (this.isEdit) {
      const enrollmentNumber = this.studentData.enrollmentNumber;
      formData.append('enrollmentNumber', enrollmentNumber.toString());
      this.registerStudent.UpdateStudentByStudentID(enrollmentNumber, formData).subscribe({
        next: () => {
          this.toastr.success('Student updated successfully');
          this.studentInfo.setStudentData(null);
          this.studentInfo.setParentData(null);
          this.route.navigate(['/adminlayout/viewAllStudent']);
        },
        error: (err) => {
          console.error(' Update error:', err);
          this.toastr.error('Failed to update student');
        }
      });
    } else {
      this.registerStudent.addStudent(formData).subscribe({
        next: () => {
          this.toastr.success('Student and parent info registered successfully');
          this.studentInfo.setStudentData(null);
          this.studentInfo.setParentData(null);
          this.route.navigate(['/adminlayout/viewAllStudent']);
        },
        error: (err) => {
          console.error(' Registration error:', err);
          this.toastr.error('Failed to register student');
        }
      });
    }
  }
}
