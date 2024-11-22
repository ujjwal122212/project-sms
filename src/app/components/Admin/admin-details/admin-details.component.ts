import { Component, inject } from '@angular/core';
import { AdminRegistrationService } from '../../../Services/admin-registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-details.component.html',
  styleUrl: './admin-details.component.css'
})
export class AdminDetailsComponent {
  regService = inject(AdminRegistrationService);
  constructor(private route: Router) {

  }
  teacher: any
  activatedRoute = inject(ActivatedRoute);
  enrollmentNumber!: number;
  async getTeacherDetailsById() {
    this.enrollmentNumber = this.activatedRoute.snapshot.params['enrollmentNumber'];
    if (this.enrollmentNumber) {
      await this.regService.getAdminById(this.enrollmentNumber).subscribe(async (res) => {
        this.teacher = res;
        console.log(this.teacher);
      })
    }

  }
  deleteTeacherByEnrollmentNumber(enrollmentNumber: number) {
    const isConfirm = confirm("Are You sure to want to delete this teacher ?");
    if (isConfirm) {
      this.regService.deleteAdmin(enrollmentNumber).subscribe((res: any) => {
        alert("Admin Deleted Successfully");
        this.route.navigateByUrl('/adminlayout/adminregistration');
      })
    }
  }
  EditTeacherById(enrollmentNumber: number) {
    this.route.navigateByUrl('/adminlayout/adminregistration/addadmin/' + enrollmentNumber);
  }
  ngOnInit(): void {
    this.getTeacherDetailsById();
  }
}
