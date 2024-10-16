// // import { CommonModule } from '@angular/common';
// // import { HttpClient } from '@angular/common/http';
// // import { Component, inject } from '@angular/core';
// // import { FormsModule } from '@angular/forms';
// // import { ToastrService } from 'ngx-toastr';

// // @Component({
// //   selector: 'app-t-help',
// //   standalone: true,
// //   imports: [CommonModule, FormsModule],
// //   templateUrl: './t-help.component.html',
// //   styleUrls: ['./t-help.component.css'],
// // })
// // export class THelpComponent {
// //   toastr = inject(ToastrService);
// //   responseMessage: string = '';
// //   hh: { dd: string } = { dd: '' };
// //   DoubtsList: any[] = [];
// //   User: any[] = [];

// //   constructor(private http: HttpClient) {
// //     this.fetchUserList();
// //     this.fetchDoubts();
// //   }

// //   fetchUserList() {
// //     this.http
// //       .get(
// //         'https://localhost:7262/api/TeacherimportantContact/GetTeacherimportantContact'
// //       )
// //       .subscribe((res: any) => (this.User = res));
// //   }

// //   fetchDoubts() {
// //     this.http
// //       .get('https://localhost:7262/GetDoubtStudents')
// //       .subscribe((res: any) => {
// //         this.DoubtsList = res;
// //         console.table(res);
// //       });
// //   }

// //   addDoubtStudent(doubtText: string): void {
// //     const apiUrl = 'https://localhost:7262/CreateDoubtStudents';
// //     const studentDoubt = { doubtText };

// //     this.http.post(apiUrl, studentDoubt, { responseType: 'text' }).subscribe(
// //       (response) => {
// //         this.responseMessage = 'Doubt added successfully!';
// //         this.toastr.success(this.responseMessage);
// //         this.fetchDoubts();
// //         this.hh.dd = ''; // Clear input field
// //       },
// //       (error) => {
// //         this.responseMessage = 'Error occurred while adding the doubt.';
// //         this.toastr.error(this.responseMessage);
// //         console.error(error);
// //       }
// //     );
// //   }

// //   deleteDoubts(id: number) {
// //     const isDelete = confirm('Are you sure you want to delete?');
// //     if (isDelete) {
// //       const url = `https://localhost:7262/DeleteDoubtStudents/${id}`;
// //       this.http.delete(url, { responseType: 'text' }).subscribe(
// //         (response) => {
// //           this.toastr.success('Doubt deleted successfully');
// //           this.fetchDoubts();
// //         },
// //         (error) => {
// //           this.toastr.error('Failed to delete.');
// //           console.error('Error:', error);
// //         }
// //       );
// //     }
// //   }

// //   editDoubts(doubt: any) {
// //     this.hh.dd = doubt.DoubtText; // Pre-fill for editing
// //   }
// // }

// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component, inject } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'app-t-help',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './t-help.component.html',
//   styleUrls: ['./t-help.component.css'],
// })
// export class THelpComponent {
//   toastr = inject(ToastrService);
//   responseMessage: string = '';
//   hh: { dd: string } = { dd: '' };
//   DoubtsList: any[] = [];
//   User: any[] = [];
//   isEditing: boolean = false;
//   currentDoubtId: number | null = null;

//   constructor(private http: HttpClient) {
//     this.fetchUserList();
//     this.fetchDoubts();
//   }

//   fetchUserList() {
//     this.http
//       .get(
//         'https://localhost:7262/api/TeacherimportantContact/GetTeacherimportantContact'
//       )
//       .subscribe((res: any) => (this.User = res));
//   }

//   fetchDoubts() {
//     this.http
//       .get('https://localhost:7262/GetDoubtStudents')
//       .subscribe((res: any) => {
//         this.DoubtsList = res;
//       });
//   }

//   addDoubtStudent(doubtText: string): void {
//     const apiUrl = 'https://localhost:7262/CreateDoubtStudents';
//     const studentDoubt = { doubtText };

//     this.http.post(apiUrl, studentDoubt, { responseType: 'text' }).subscribe(
//       (response) => {
//         this.toastr.success('Doubt added successfully!');
//         this.fetchDoubts();
//         this.hh.dd = ''; // Clear input field
//       },
//       (error) => {
//         this.toastr.error('Error occurred while adding the doubt.');
//       }
//     );
//   }

//   deleteDoubts(id: number) {
//     const isDelete = confirm('Are you sure you want to delete?');
//     if (isDelete) {
//       const url = `https://localhost:7262/DeleteDoubtStudents/${id}`;
//       this.http.delete(url, { responseType: 'text' }).subscribe(
//         (response) => {
//           this.toastr.success('Doubt deleted successfully');
//           this.fetchDoubts();
//         },
//         (error) => {
//           this.toastr.error('Failed to delete.');
//         }
//       );
//     }
//   }

//   addOrEditDoubt(): void {
//     if (this.isEditing && this.currentDoubtId !== null) {
//       this.updateDoubt(this.currentDoubtId, this.hh.dd);
//     } else {
//       this.addDoubtStudent(this.hh.dd);
//     }
//   }

//   editDoubts(doubt: any) {
//     this.hh.dd = doubt.DoubtText; // Pre-fill for editing
//     this.isEditing = true; // Set edit mode
//     this.currentDoubtId = doubt.DoubtId; // Store the ID of the doubt being edited
//   }

//   updateDoubt(id: number, doubtText: string) {
//     const apiUrl = `https://localhost:7262/api/TeacherDoubt/EditTeacherDoubts/${id}`;
//     const updatedDoubt = { doubtText };

//     this.http.put(apiUrl, updatedDoubt, { responseType: 'text' }).subscribe(
//       (response) => {
//         this.toastr.success('Doubt updated successfully!');
//         this.fetchDoubts();
//         this.hh.dd = ''; // Clear input field
//         this.isEditing = false; // Reset edit mode
//         this.currentDoubtId = null; // Clear the current ID
//       },
//       (error) => {
//         this.toastr.error('Error occurred while updating the doubt.');
//       }
//     );
//   }
// }

// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component, inject } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'app-t-help',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './t-help.component.html',
//   styleUrls: ['./t-help.component.css'],
// })
// export class THelpComponent {
//   toastr = inject(ToastrService);
//   responseMessage: string = '';
//   hh: { dd: string } = { dd: '' };
//   DoubtsList: any[] = [];
//   User: any[] = [];
//   isEditing: boolean = false;
//   currentDoubtId: number | null = null;

//   constructor(private http: HttpClient) {
//     this.fetchUserList();
//     this.fetchDoubts();
//   }

//   fetchUserList() {
//     this.http
//       .get('https://localhost:7262/api/TeacherimportantContact/GetTeacherimportantContact')
//       .subscribe((res: any) => (this.User = res));
//   }

//   fetchDoubts() {
//     this.http
//       .get('https://localhost:7262/GetDoubtStudents')
//       .subscribe((res: any) => {
//         this.DoubtsList = res;
//       });
//   }

//   addDoubtStudent(doubtText: string): void {
//     const apiUrl = 'https://localhost:7262/CreateDoubtStudents';
//     const studentDoubt = { doubtText };

//     this.http.post(apiUrl, studentDoubt, { responseType: 'text' }).subscribe(
//       (response) => {
//         this.toastr.success('Doubt added successfully!');
//         this.fetchDoubts();
//         this.hh.dd = ''; // Clear input field
//       },
//       (error) => {
//         this.toastr.error('Error occurred while adding the doubt.');
//       }
//     );
//   }

//   deleteDoubts(id: number) {
//     const isDelete = confirm('Are you sure you want to delete?');
//     if (isDelete) {
//       const url = `https://localhost:7262/DeleteDoubtStudents/${id}`;
//       this.http.delete(url, { responseType: 'text' }).subscribe(
//         (response) => {
//           this.toastr.success('Doubt deleted successfully');
//           this.fetchDoubts();
//         },
//         (error) => {
//           this.toastr.error('Failed to delete.');
//         }
//       );
//     }
//   }

//   addOrEditDoubt(): void {
//     if (this.isEditing && this.currentDoubtId !== null) {
//       this.updateDoubt(this.currentDoubtId, this.hh.dd);
//     } else {
//       this.addDoubtStudent(this.hh.dd);
//     }
//   }

//   editDoubts(doubt: any) {
//     this.hh.dd = doubt.DoubtText; // Pre-fill for editing
//     this.isEditing = true; // Set edit mode
//     this.currentDoubtId = doubt.DoubtId; // Store the ID of the doubt being edited
//     console.log('Editing:', doubt); // Log the doubt being edited
//   }

//   updateDoubt(id: number, doubtText: string) {
//     const apiUrl = `https://localhost:7262/api/TeacherDoubt/EditTeacherDoubts/${id}`;
//     const updatedDoubt = { doubtText };

//     console.log('Updating:', updatedDoubt); // Log the updated doubt

//     this.http.put(apiUrl, updatedDoubt, { responseType: 'text' }).subscribe(
//       (response) => {
//         this.toastr.success('Doubt updated successfully!');
//         this.fetchDoubts();
//         this.hh.dd = ''; // Clear input field
//         this.isEditing = false; // Reset edit mode
//         this.currentDoubtId = null; // Clear the current ID
//       },
//       (error) => {
//         this.toastr.error('Error occurred while updating the doubt.');
//         console.error(error); // Log the error
//       }
//     );
//   }
// }

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
  hh: { dd: string } = { dd: '' };
  DoubtsList: any[] = [];
  User: any[] = [];
  isEditing: boolean = false;
  currentDoubtId: number | null = null;

  constructor(private http: HttpClient) {
    this.fetchUserList();
    this.fetchDoubts();
  }

  fetchUserList() {
    this.http
      .get(
        'https://localhost:7262/api/TeacherimportantContact/GetTeacherimportantContact'
      )
      .subscribe((res: any) => (this.User = res));
  }

  fetchDoubts() {
    this.http
      .get('https://localhost:7262/api/TeacherDoubt/GetTeacherDoubts')
      .subscribe((res: any) => {
        this.DoubtsList = res;
      });
  }

  addDoubtStudent(doubtText: string): void {
    const apiUrl =
      'https://localhost:7262/api/TeacherDoubt/CreateTeacherDoubts';
    const studentDoubt = { doubtText };

    this.http.post(apiUrl, studentDoubt, { responseType: 'text' }).subscribe(
      () => {
        this.toastr.success('Doubt added successfully!');
        this.fetchDoubts();
        this.hh.dd = ''; // Clear input field
      },
      () => {
        this.toastr.error('Error occurred while adding the doubt.');
      }
    );
  }

  deleteDoubts(id: number) {
    const isDelete = confirm('Are you sure you want to delete?');
    if (isDelete) {
      const url = `https://localhost:7262/api/TeacherDoubt/DeleteTeacherDoubts/${id}`;
      this.http.delete(url, { responseType: 'text' }).subscribe(
        () => {
          this.toastr.success('Doubt deleted successfully');
          this.fetchDoubts();
        },
        () => {
          this.toastr.error('Failed to delete.');
        }
      );
    }
  }

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
    const apiUrl = `https://localhost:7262/api/TeacherDoubt/EditTeacherDoubts/${id}`;
    const updatedDoubt = { doubtText };

    console.log('Updating:', updatedDoubt); // Log the updated doubt

    this.http.put(apiUrl, updatedDoubt, { responseType: 'text' }).subscribe(
      () => {
        this.toastr.success('Doubt updated successfully!');
        this.fetchDoubts();
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
