


import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-help',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student-help.component.html',
  styleUrls: ['./student-help.component.css']
})
export class StudentHelpComponent {
  toastr = inject(ToastrService);
  responseMessage: string = '';
  hh: any = {
    dd: ''
  };

  DoubtsList: any[] = [];
  User: any[] = [];
  isEditing: boolean = false;
  currentDoubtId: number | null = null;

  constructor(private http: HttpClient) {
    this.UserList();
    this.GetDoubts();
  }

  UserList() {
    this.http.get("https://localhost:7262/GetContacts").subscribe((res: any) => {
      this.User = res;
    });
  }

  GetDoubts() {
    this.http.get("https://localhost:7262/GetDoubtStudents").subscribe((res: any) => {
      this.DoubtsList = res;
      console.table(res);
    });
  }

  addDoubtStudent(doubtText: string): void {
    const apiUrl = 'https://localhost:7262/CreateDoubtStudents';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const studentDoubt = { doubtText: doubtText };

    this.http.post(apiUrl, studentDoubt, { headers: headers, responseType: 'text' })
      .subscribe(
        (response) => {
          this.responseMessage = 'Doubt added successfully!';
          console.log(response);
          this.GetDoubts();
          this.hh = { dd: '' };
        },
        (error) => {
          this.responseMessage = 'Error occurred while adding the doubt.';
          console.error(error);
        }
      );
  }

  // Delete Doubts
  deleteDoubts(id: number) {
    const isDelete = confirm("Are you sure you want to delete");
    if (isDelete) {
      const url = `https://localhost:7262/DeleteDoubtStudents/${id}`;
      this.http.delete(url, { responseType: 'text' })
        .subscribe(
          response => {
            console.log('Response:', response);
            this.toastr.error('Doubts Deleted Successfully');
            this.GetDoubts();
          },
          error => {
            console.error('Error:', error);
            alert('Failed to delete.');
          }
        );
    }
  }

  // Edit Doubts
  addOrEditDoubt(): void {
    if (this.isEditing && this.currentDoubtId !== null) {
      this.updateDoubt(this.currentDoubtId, this.hh.dd);
    } else {
      this.addDoubtStudent(this.hh.dd);
    }
  }

  editDoubts(doubt: any) {
    this.hh.dd = doubt.DoubtText; // Pre-fill for editing
    this.isEditing = true; // Set edit mode
    this.currentDoubtId = doubt.DoubtId; // Store the ID of the doubt being edited
    console.log('Editing:', doubt); // Log the doubt being edited
  }

  updateDoubt(id: number, doubtText: string) {
    const apiUrl = `https://localhost:7262/EditDoubtStudent/${id}`;
    const updatedDoubt = { doubtText };

    console.log('Updating:', updatedDoubt); // Log the updated doubt

    this.http.put(apiUrl, updatedDoubt, { responseType: 'text' }).subscribe(
      () => {
        this.toastr.success('Doubt updated successfully!');
        this.GetDoubts();
        this.hh.dd = ''; // Clear input field
        this.isEditing = false; // Reset edit mode
        this.currentDoubtId = null; // Clear the current ID
      },
      (error) => {
        this.toastr.error('Error occurred while updating the doubt.');
        console.error('Update Error:', error); // Log the error
      }
    );
  }
}
