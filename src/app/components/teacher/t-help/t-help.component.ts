import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-t-help',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './t-help.component.html',
  styleUrls: ['./t-help.component.css'],
})
export class THelpComponent {
  
  toastr = inject(ToastrService);
  responseMessage: string = '';
  hh: { dd: string } = { dd: '' };
  DoubtsList: any[] = [];
  User: any[] = [];

  constructor(private http: HttpClient) {
    this.fetchUserList();
    this.fetchDoubts();
  }

  fetchUserList() {
    this.http.get('https://localhost:7262/GetContacts').subscribe(
      (res: any) => (this.User = res),
      (error) => this.toastr.error('Error fetching contacts.')
    );
  }

  fetchDoubts() {
    this.http.get('https://localhost:7262/GetDoubtStudents').subscribe(
      (res: any) => {
        this.DoubtsList = res;
        console.table(res);
      },
      (error) => this.toastr.error('Error fetching doubts.')
    );
  }

  addDoubtStudent(doubtText: string): void {
    const apiUrl = 'https://localhost:7262/CreateDoubtStudents';
    const studentDoubt = { doubtText };

    this.http.post(apiUrl, studentDoubt, { responseType: 'text' }).subscribe(
      (response) => {
        this.responseMessage = 'Doubt added successfully!';
        this.toastr.success(this.responseMessage);
        this.fetchDoubts();
        this.hh.dd = ''; // Clear input field
      },
      (error) => {
        this.responseMessage = 'Error occurred while adding the doubt.';
        this.toastr.error(this.responseMessage);
        console.error(error);
      }
    );
  }

  deleteDoubts(id: number) {
    const isDelete = confirm('Are you sure you want to delete?');
    if (isDelete) {
      const url = `https://localhost:7262/DeleteDoubtStudents/${id}`;
      this.http.delete(url, { responseType: 'text' }).subscribe(
        (response) => {
          this.toastr.success('Doubt deleted successfully');
          this.fetchDoubts();
        },
        (error) => {
          this.toastr.error('Failed to delete.');
          console.error('Error:', error);
        }
      );
    }
  }

  editDoubts(doubt: any) {
    this.hh.dd = doubt.DoubtText; // Pre-fill for editing
  }
}
