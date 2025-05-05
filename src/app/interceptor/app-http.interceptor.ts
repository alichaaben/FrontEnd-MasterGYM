import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
//import { AuthentificationService } from '../services/authentification.service';

@Injectable()
//export class AppHttpInterceptor implements HttpInterceptor {
  export class AppHttpInterceptor  {
  // constructor(
  //   private authentificationService: AuthentificationService,
  //   private router: Router
  // ) {}

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const accessToken = this.authentificationService?.accessToken;

  //   if (!req.url.includes('/auth/login')) {
  //     let request = req.clone({
  //       headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
  //     });

  //     return next.handle(request).pipe(
  //       catchError(err => {
  //         if (err.status === 401) {
  //           // Token expiré ou non valide
  //           this.authentificationService.logout();
  //         }
  //         // Retourner une erreur complete pour le debogage
  //         return throwError(() => err);
  //       })
  //     );
  //   } else {
  //     return next.handle(req);
  //   }
  // }
}
