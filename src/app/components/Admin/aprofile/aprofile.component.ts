import { Component, inject, OnInit } from '@angular/core';
import { AdminRegistrationService } from '../../../Services/admin-registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../Services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aprofile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aprofile.component.html',
  styleUrl: './aprofile.component.css'
})
export class AprofileComponent implements OnInit{
  regService = inject(AdminRegistrationService);
  enrollmentNo!: number|null;
  loginService=inject(LoginService);
  constructor(private route: Router) {

  }
  teacher: any
  activatedRoute = inject(ActivatedRoute);
  enrollmentNumber!: number;
  getAdminById(enrollmentNo: number) {
    this.regService.getAdminById(enrollmentNo).subscribe((res: any) => {
      this.teacher = res;
      console.log(res);
    })
  }
  editDetails(enrollmentNumber:number){
     this.route.navigateByUrl('/adminlayout/aprofile/updateprofile/'+enrollmentNumber);
  }
  ngOnInit(): void {
    this.enrollmentNo = this.loginService.enrollmentNumber;
    if (this.enrollmentNo) {
      console.log('Login Enrollment Number:', this.enrollmentNo);
      this.getAdminById(this.enrollmentNo);
    }
  }
}
