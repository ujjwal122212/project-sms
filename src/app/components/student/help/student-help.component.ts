import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  responseMessage: string = '';

  DoubtsList:any[]=[];
  User:any[]=[];

  constructor(private http:HttpClient){
    this.UserList();
    this.GetDoubts();
  }

  UserList(){
    this.http.get("https://localhost:7262/GetContacts").subscribe((res:any)=>{
      this.User=res;

      })
    }

    GetDoubts(){

      this.http.get("https://localhost:7262/GetDoubtStudents").subscribe((res:any)=>{
        this.DoubtsList=res;
        console.table(res);

        })
      }

      addDoubtStudent(doubtText: string): void {
        const apiUrl = 'https://localhost:7262/CreateDoubtStudents';

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        const studentDoubt = {
          doubtText: doubtText
        };

        this.http.post(apiUrl, studentDoubt, { headers: headers, responseType: 'text' })
          .subscribe(
            (response) => {
              this.responseMessage = 'Doubt added successfully!';
              console.log(response);
              this.GetDoubts();


            },
            (error) => {
              this.responseMessage = 'Error occurred while adding the doubt.';
              console.error(error);
            }
          );
      }

}
