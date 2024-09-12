import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
export const authorizationGuard: CanActivateFn = (route, state) => {
const authService = inject(AuthService);
const router = inject(Router);
if(authService.roles.includes("ADMIN")){
  return true;
}else{
 router.navigateByUrl("/admin/notAuthorized");
  return false;
}
};
