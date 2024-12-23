import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LoginService } from '../../Services/login.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
  LoginForm: FormGroup = new FormGroup({});
  loginService = inject(LoginService);
  constructor(private fb: FormBuilder) { }
  http = inject(HttpClient);
  route = inject(Router);
  rolesArray: string[] = ['Student', 'Teacher', 'Admin'];
  setFormState() {
    this.LoginForm = this.fb.group({
      enrollmentNumber: ['', Validators.required],
      password: ['', Validators.required],
      // role: ['']
    })
  }
  
  onSubmit() {
    if (this.LoginForm.invalid) {
      alert("Please fill all the valid Details");
      return;
    }
    const formvalue = this.LoginForm.value;
    this.loginService.login(formvalue)
      .pipe(
        catchError((error) => {
          console.error('Error occurred during login:', error);
          let errorMessage = 'An unknown error occurred!';

          if (error.status == 401) {
            errorMessage = 'Invalid login credentials. Please try again.';
          } else if (error.status === 500) {
            errorMessage = 'Server error. Please try again later.';
          } else if (error.status === 0) {
            errorMessage = 'Network error. Please check your connection.';
          }

          alert(errorMessage);
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (res: any) => {
          console.log(res);
          const enrollmentNo=res.id;
          if (res.role === 'Student') {
            alert("Login Successfull");
            this.route.navigateByUrl('/studentlayout/S-home');
            this.loginService.setEnrollmentNumber(enrollmentNo);
          }
          else if (res.role === 'Teacher') {
            alert("Login Successfull");
            this.route.navigateByUrl('/teacherlayout/T-home');
            this.loginService.setEnrollmentNumber(enrollmentNo);
          }
          else if (res.role === 'Admin') {
            alert("Login Successfull");
            this.route.navigateByUrl('/adminlayout/ahome');
            this.loginService.setEnrollmentNumber(enrollmentNo);
          }
        },
        error: (err) => {
          console.log('Error in subscription:', err);
        }
      });
  }
  ngOnInit(): void {
    this.setFormState();
  }
}
