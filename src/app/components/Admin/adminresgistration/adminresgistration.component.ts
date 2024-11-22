import { Component, inject, OnInit } from '@angular/core';
import { AdminRegistrationService } from '../../../Services/admin-registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminresgistration',
  standalone: true,
  imports: [],
  templateUrl: './adminresgistration.component.html',
  styleUrl: './adminresgistration.component.css'
})
export class AdminresgistrationComponent implements OnInit {
  regService = inject(AdminRegistrationService);
  router = inject(Router);
  teachers: any[] = [];
  openForm() {
    this.router.navigateByUrl('/adminlayout/adminregistration/addadmin');
  }
  more_Details(enrollmentNumber: number) {
    this.router.navigateByUrl('/adminlayout/adminregistration/admindetail/' + enrollmentNumber);
  }
  getAllAdmins() {
    this.regService.getAllAdmins().subscribe((res: any) => {
      this.teachers = res;
      console.log(this.teachers);
    })
  }
  ngOnInit(): void {
    this.getAllAdmins();
  }
}
