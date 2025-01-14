import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { error } from 'console';
import { catchError, throwError } from 'rxjs';
import { LoginService } from '../../Services/login.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(LoginService)
  const token = localStorage.getItem('jwtToken');


  const clonedReq = token
    ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    : req;
  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error) {
        const isRefresh = confirm("Your Session is Expired. Do you want to Continue?");
        if (isRefresh) {
          loginService.$refreshToken.next(true);
        }
      }
      return throwError(error)
    }
    )
  );
};
