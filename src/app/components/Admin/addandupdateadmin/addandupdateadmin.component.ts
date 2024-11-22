import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminRegistrationService } from '../../../Services/admin-registration.service';

@Component({
  selector: 'app-addandupdateadmin',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './addandupdateadmin.component.html',
  styleUrl: './addandupdateadmin.component.css'
})
export class AddandupdateadminComponent implements OnInit {
  router = inject(Router);
  regService = inject(AdminRegistrationService)
  State: any[] = [];
  District: any[] = [];
  regForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder) { }
  goto() {
    this.router.navigateByUrl('/adminlayout/adminregistration');
  }
  loadState() {
    this.regService.getStates().subscribe((res: any) => {
      this.State = res;
      console.log(this.State);
    })
  }
  onStateChange(event: any) {
    this.selectedStateId = event.target.value;
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
  setRegForm() {
    this.regForm = this.fb.group({
      enrollmentNumber: [0],
      name: ['', Validators.required],
      imagePath: [null],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      contact: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
      pincode: ['', Validators.required],
      password: ['Admin@123'],
      createdDate: [Date]
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
  insertTeacherDetails() {
    if (this.regForm.invalid) {
      alert("Please fill all the valid details");
      return;
    }
    else {
      const formdata = new FormData();
      formdata.append('name', this.regForm.get('name')?.value);
      formdata.append('dob', this.regForm.get('dob')?.value);
      formdata.append('gender', this.regForm.get('gender')?.value);
      formdata.append('contact', this.regForm.get('contact')?.value);
      formdata.append('email', this.regForm.get('email')?.value);
      formdata.append('state', this.regForm.get('state')?.value);
      formdata.append('district', this.regForm.get('district')?.value);
      formdata.append('pincode', this.regForm.get('pincode')?.value);
      formdata.append('ImagePath', this.regForm.get('imagePath')?.value);
      this.regService.addAdminDetails(formdata).subscribe((res: any) => {
        alert('Admin Details added Successfullly');
        this.router.navigateByUrl('/adminlayout/adminregistration');
        this.regForm.reset();
      })
    }
  }

  async patchImagePathToForm(imagePath: string) {
    const file = await this.convertImagePathToFile(imagePath, 'AdminImage.jpg');

    this.regForm.patchValue({
      imagePath: file
    });
    const inputFileElement = this.fileInput.nativeElement;
    const fileList: FileList = this.createFileList(file);
    inputFileElement.files = fileList;
  }


  baseImageUrl: string = 'https://localhost:7262/Admin/';
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
  enrollmentNumber!: number;
  isEdit = false;
  async updation() {
    this.enrollmentNumber = this.activatedRoute.snapshot.params['enrollmentNumber'];
    if (this.enrollmentNumber) {
      this.isEdit = true;
      this.regService.getAdminById(this.enrollmentNumber).subscribe(async (result: any) => {
        console.log("Result here",result);
        this.regForm.patchValue(result);
        if (result.dob) {
          const dateObj = new Date(result.dob);
          const formattedDate = dateObj.toISOString().split('T')[0];
          result.dob = formattedDate;
        }
        this.regForm.patchValue({
          dob: result.dob
        });
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
  EditTeacher() {
    if (this.regForm.invalid) {
      alert("Please fill all the valid details");
      return;
    }
    else {
      const formdata = new FormData();
      const enrollmentNumber = this.regForm.get('enrollmentNumber')?.value;
      formdata.append('name', this.regForm.get('name')?.value);
      formdata.append('dob', this.regForm.get('dob')?.value);
      formdata.append('gender', this.regForm.get('gender')?.value);
      formdata.append('contact', this.regForm.get('contact')?.value);
      formdata.append('email', this.regForm.get('email')?.value);
      formdata.append('state', this.regForm.get('state')?.value);
      formdata.append('district', this.regForm.get('district')?.value);
      formdata.append('pincode', this.regForm.get('pincode')?.value);
      formdata.append('ImagePath', this.regForm.get('imagePath')?.value);
      this.regService.updateAdmin(enrollmentNumber, formdata).subscribe((res: any) => {
        alert('Admin Details Updated Successfullly');
        this.router.navigateByUrl('/adminlayout/adminregistration');
        this.regForm.reset();
      })
    }
  }
  onSubmit() {
    console.log(this.regForm.value);
    if (this.isEdit) {
      this.EditTeacher();
    }
    else {
      this.insertTeacherDetails();
    }
  }
  ngOnInit(): void {
    this.setRegForm();
    this.loadState();
    this.updation();
  }
 
}
