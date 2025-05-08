import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DarkModeService } from '../../admin-template/services/dark-mode.service';
import { AuthentificationService } from '../../services/authentification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  showErrorModal = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private darkModeService: DarkModeService,
    private authentificationService: AuthentificationService){

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      rememberMe: [false],
    });
  }
  ngOnInit(): void {
    // Access dark mode state
    const isDarkMode = this.darkModeService.getDarkMode();
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }



  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  onSubmit(): void {
    if (this.loginForm.valid) {
      this.LoginAuth();
    } else {
      console.log('Form is invalid');
    }
  }

  LoginAuth(): void {
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    this.authentificationService.login(username, password).subscribe({
      next: (data) => {
        this.authentificationService.loadUser(data);
      },
      error: (err) => {
        console.error('Erreur Authentification :', err);
        this.showErrorModal = true;
        this.loginForm.get('password')?.reset();
      }
    });
  }

  closeErrorModal(): void {
    this.showErrorModal = false;
  }

}

