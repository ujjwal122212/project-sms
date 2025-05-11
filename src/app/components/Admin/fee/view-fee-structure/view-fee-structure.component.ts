import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-fee-structure',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './view-fee-structure.component.html',
  styleUrl: './view-fee-structure.component.css'
})
export class ViewFeeStructureComponent {
 feeStructureList:any[]=[];

  constructor(private http:HttpClient){
     this.getFeeStructure();
  }

  getFeeStructure(){
    this.http.get("https://localhost:7262/api/FeeStructure/GetAllFeeStructure").subscribe((result:any)=>{
      this.feeStructureList=result;
      
    })
  }

  deleteFeeStructure(id:number){
    const Url='https://localhost:7262/api/FeeStructure/DeleteFeeStructure/'+id;
    if (confirm('Do you want to delete this item?')) {
    
    this.http.delete(Url,{responseType:'text'}).subscribe(result=>{
      alert(result);
      this.getFeeStructure();
    })
  }
  else{
    alert('Not deleted');
  }
  }


}
