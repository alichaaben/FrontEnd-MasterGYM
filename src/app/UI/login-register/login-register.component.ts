import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})
export class LoginRegisterComponent implements OnInit {
  activeTab: 'login' | 'register' = 'login';
  authForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      rememberMe: [false]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Check if we should show login or register based on route
    const path = window.location.pathname;
    if (path.includes('register')) {
      this.activeTab = 'register';
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  toggleTab() {
    this.activeTab = this.activeTab === 'login' ? 'register' : 'login';
    this.errorMessage = '';
    this.successMessage = '';

    // Reset form but keep email if switching tabs
    const email = this.authForm.get('email')?.value;
    this.authForm.reset();
    if (email) {
      this.authForm.get('email')?.setValue(email);
    }

    if (this.activeTab === 'login') {
      this.authForm.get('name')?.clearValidators();
      this.authForm.get('confirmPassword')?.clearValidators();
    } else {
      this.authForm.get('name')?.setValidators([Validators.required]);
      this.authForm.get('confirmPassword')?.setValidators([Validators.required]);
    }

    this.authForm.get('name')?.updateValueAndValidity();
    this.authForm.get('confirmPassword')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.activeTab === 'login') {
      this.login();
    } else {
      this.register();
    }
  }

  login() {
    const { email, password, rememberMe } = this.authForm.value;

    // In a real app, you would call your authentication service here
    this.http.post('/api/auth/login', { email, password, rememberMe })
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Login failed. Please try again.';
        }
      });
  }

  register() {
    const { name, email, password } = this.authForm.value;

    // In a real app, you would call your registration service here
    this.http.post('/api/auth/register', { name, email, password })
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = 'Registration successful! You can now login.';
          this.activeTab = 'login';
          this.authForm.reset();
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
        }
      });
  }
}
