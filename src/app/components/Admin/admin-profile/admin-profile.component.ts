import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../Services/login.service';
import { AdminRegistrationService } from '../../../Services/admin-registration.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent {
  enrollmentNo!: number | null;
  teacher:any;
  route = inject(Router)
  loginService = inject(LoginService)
  regService=inject(AdminRegistrationService)
  logout() {
    this.loginService.logout();
    this.route.navigateByUrl('/Login-page');
  }
  getTeacherById(enrollmentNo:number){
    this.regService.getAdminById(enrollmentNo).subscribe((res:any)=>{
     this.teacher=res;
     console.log(res);
    })
   }
   ngOnInit(): void {
     this.enrollmentNo = this.loginService.enrollmentNumber;
     if (this.enrollmentNo) {
       console.log('Login Enrollment Number:', this.enrollmentNo);
       this.getTeacherById(this.enrollmentNo);
     }
   }
}
