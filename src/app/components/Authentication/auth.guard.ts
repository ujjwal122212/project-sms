import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  
  const userRole = localStorage.getItem('role');

 
  const allowedRoles = route.data['roles'] as string[];

  if (userRole && allowedRoles.includes(userRole)) {
    
    return true;
  }

  // Redirect to unauthorized or login page
  router.navigate(['/unauthorized']);
  return false;
};
