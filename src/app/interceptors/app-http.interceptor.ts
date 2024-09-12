
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent} from '@angular/common/http';
import { AuthService } from '../services/auth.service'; // Ajustez le chemin si nécessaire
import { inject } from '@angular/core'; // Importer depuis @angular/core
import { Observable, throwError } from 'rxjs';

export const appHttpInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);  // Injectez le service ici

  // Vérifiez si la requête n'est pas liée à l'authentification
  if (!req.url.includes("/auth/login")) {
    console.log('Adding Authorization Header:', authService.accessToken);

    // Clonez la requête pour ajouter l'en-tête Authorization
    const newRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authService.accessToken)
    });

    return next(newRequest)  // Passez la requête modifiée au gestionnaire suivant
  } else {
    console.log('No Authorization Header');
    return next(req);  // Passez la requête sans modification
  }
};
