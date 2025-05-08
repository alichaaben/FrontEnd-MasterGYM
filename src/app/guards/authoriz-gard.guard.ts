import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';

export const authorizGardGuardAdmin: CanActivateFn = (route, state) => {
  const authentificationService = inject(AuthentificationService);
  const router = inject(Router);

  const hasRole = authentificationService.roles.includes("ROLE_Admin");

  if (!hasRole) {
    router.navigateByUrl("/admin/error");
    return false;
  }

  return true;
};

export const authorizGardGuardCoach: CanActivateFn = (route, state) => {
  const authentificationService = inject(AuthentificationService);
  const router = inject(Router);

  // Vérifier si l'utilisateur a un rôle approprié
  const hasRole = ["ROLE_Coach", "ROLE_Admin"].some(role =>
    authentificationService.roles.includes(role)
  );

  if (!hasRole) {
    // Rediriger si l'utilisateur n'a pas le rôle requis
    router.navigateByUrl("/admin/error");
    return false;
  }

  // Autoriser l'accès si un rôle est trouvé
  return true;
};

