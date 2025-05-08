import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-fee-structure',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './create-fee-structure.component.html',
  styleUrl: './create-fee-structure.component.css'
})
export class CreateFeeStructureComponent {
   classList:any[]=[];
   yearList:any[]=[];

   feeStructure = {
    admissionFee: null,
    monthlyFeeAmount: null,
    lateFeePerMonth: null,
    discountAllowed: null,
    classId: '',
    academicYear: ''
  };
  
  


   constructor(private http:HttpClient){

    this.getAllClasses();
    this.getAllYear();
   }

   getAllClasses(){
    this.http.get("https://localhost:7262/Classes").subscribe((result:any)=>{
      this.classList=result;
    })
   }

   getAllYear(){
    this.http.get("https://localhost:7262/GetAcedmicYear").subscribe((result:any)=>{
      this.yearList=result;
    })
   }

   submitFeeStructure() {
    this.http.post("https://localhost:7262/api/FeeStructure/AddFeeStructure", this.feeStructure)
      .subscribe({
        next: (res) => {
          alert("Fee structure added successfully.");
          
          this.feeStructure = {
            admissionFee: null,
            monthlyFeeAmount: null,
            lateFeePerMonth: null,
            discountAllowed: null,
            classId: '',
            academicYear: ''
          };
          
        },
        error: (err) => {
          console.error(err);
          alert("Failed to add fee structure.");
        }
      });
  }
  

}
