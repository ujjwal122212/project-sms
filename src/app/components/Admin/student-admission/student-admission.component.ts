import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-admission',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-admission.component.html',
  styleUrl: './student-admission.component.css'
})
export class StudentAdmissionComponent {

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
