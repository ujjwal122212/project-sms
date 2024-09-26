import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-help',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './student-help.component.html',
  styleUrl: './student-help.component.css'
})
export class StudentHelpComponent {



  User:any[]=[];

  constructor(private http:HttpClient){
    this.UserList();
  }

  UserList(){
    this.http.get("https://localhost:7262/GetContacts").subscribe((res:any)=>{
      this.User=res;

      })
    }

}
