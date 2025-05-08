import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; //installer npm i jwt-decode
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {

  isAuthenticated: boolean = false;
  roles: any;
  username: any;
  userId: any;
  accessToken!: any;

  constructor(private http: HttpClient, private router: Router) { }

  public login(userName: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new HttpParams()
      .set('userName', userName)
      .set('password', password);

    return this.http.post(`${environment.BackEndHost}/auth/login`, body.toString(), { headers });
  }



  loadUser(data: any) {
    this.isAuthenticated = true;
    this.accessToken = data['access-token'];

    // Décoder le jeton JWT
    const jwtdecoder: any = jwtDecode(this.accessToken);
    this.username = jwtdecoder.sub;
    this.userId = jwtdecoder.userId;
    this.roles = Array.isArray(jwtdecoder.scope) ? jwtdecoder.scope : [jwtdecoder.scope];

    // Stocker le jwt-token dans le localStorage
    window.localStorage.setItem("jwt-token", this.accessToken);

    // Redirection selon le rôle
    if (this.roles.includes('ROLE_Admin')) {
      // this.router.navigate(['/admin/dashboard']);
      this.router.navigate(['/admin/dashboard']);
    } else if (this.roles.includes('ROLE_Coach')) {
      this.router.navigate(['/admin/customer-coatch']);
    }
  }



  logout() {
    this.isAuthenticated = false;
    this.accessToken = undefined;
    this.username = undefined;
    this.roles = undefined;
    window.localStorage.removeItem("jwt-token");
    this.router.navigateByUrl("/login");
  }

  loadJwtTokenFromLocalStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = window.localStorage.getItem("jwt-token");
      if (token) {
        this.loadUser({ "access-token": token });
        //this.router.navigateByUrl("/admin/**");
      }
    }
  }

}
