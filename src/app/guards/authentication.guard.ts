import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router);  
  if (authService.isAuthenticated) {        // Vérifiez si l'utilisateur est authentifié
    return true;                            // L'utilisateur est authentifié, autorisez l'accès
  } else {
    // Redirigez l'utilisateur vers la page de connexion s'il n'est pas authentifié
    router.navigate(['/login']);           // Redirigez vers une page de login
   // router.navigateByUrl("/login")
    return false;                          // Bloquez l'accès
  }
};
