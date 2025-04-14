import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LoginService } from '../../Services/login.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
  toastr = inject(ToastrService);
  LoginForm: FormGroup = new FormGroup({});
  loginService = inject(LoginService);
  http = inject(HttpClient);
  route = inject(Router);

  constructor(private fb: FormBuilder) { }

  setFormState() {
    this.LoginForm = this.fb.group({
      identifier: ['', Validators.required], // Changed from enrollmentNumber
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.LoginForm.invalid) {
      this.toastr.warning("Please fill all the valid Details");
      return;
    }

    const formValue = this.LoginForm.value;

    this.loginService.login(formValue)
      .pipe(
        catchError((error) => {
          console.error('Error occurred during login:', error);
          let errorMessage = 'An unknown error occurred!';

          if (error.status === 400 && error.error?.errors?.Identifier) {
            errorMessage = 'Enrollment Number is required.';
          } else if (error.status == 401) {
            errorMessage = 'Invalid login credentials. Please try again.';
          } else if (error.status === 500) {
            errorMessage = 'Server error. Please try again later.';
          } else if (error.status === 0) {
            errorMessage = 'Network error. Please check your connection.';
          }

          this.toastr.error(errorMessage);
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (res: any) => {
          console.log(res);
          if (!res?.id || !res?.token || !res?.role) {
            this.toastr.error("Invalid response from server.");
            return;
          }

          const enrollmentNo = res.id;
          localStorage.setItem("Id", res.id);
          localStorage.setItem("jwtToken", res.token);
          localStorage.setItem("role", res.role);
          localStorage.setItem("refreshToken", res.refreshToken);

          this.toastr.success("Login Successful");

          if (res.role === 'Student') {
            this.route.navigateByUrl('/studentlayout/S-home');
          } else if (res.role === 'Teacher') {
            this.route.navigateByUrl('/teacherlayout/T-home');
          } else if (res.role === 'Admin') {
            this.route.navigateByUrl('/adminlayout/ahome');
          }

          this.loginService.setEnrollmentNumber(enrollmentNo);
        },
        error: (err) => {
          console.log('Error in subscription:', err);
        }
      });
  }

  ngOnInit(): void {
    this.setFormState();
  }


  focusedFields: { [key: string]: boolean } = {};

setFocus(field: string, isFocused: boolean) {
  this.focusedFields[field] = isFocused;
}

isFieldFocused(field: string): boolean {
  return !!this.focusedFields[field];
}

}
