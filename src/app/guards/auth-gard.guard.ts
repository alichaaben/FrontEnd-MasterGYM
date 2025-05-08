import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authentificationService = inject(AuthentificationService);

  // Verifiez si le token est deja charge
  if (!authentificationService.isAuthenticated) {
    authentificationService.loadJwtTokenFromLocalStorage();
  }

  if (authentificationService.isAuthenticated) {
    return true;
  } else {
    router.navigateByUrl("/login");
    return false;
  }
};

//gaurd total pour tous les componenets


