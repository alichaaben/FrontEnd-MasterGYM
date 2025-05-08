import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../../model/user.model';
import { UserService } from '../../services/user.service';
import { AuthentificationService } from '../../services/authentification.service';
import { environment } from '../../../environments/environment.dev';

type Tab = 'profile' | 'password' | 'notifications' | 'infoSoc';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  updateProfile: FormGroup;
  updatePassword: FormGroup;
  activeTab: Tab = 'profile';
  displayedImage: string = 'assets/user-upload-bro.svg';
  selectedFile: File | null = null;
  currentUser: UserModel | null = null;

    imageBaseUrl = `${environment.UrlImages}`;

  tabs = [
    { id: 'profile' as const, label: 'Profil Public' },
    { id: 'password' as const, label: 'Mot de Passe' },
  ];

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UserService,
    private authentificationService: AuthentificationService
  ) {
    this.updateProfile = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8,12}$/)]],
    });

    this.updatePassword = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.loadUser();
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.displayedImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  loadUser(): void {
    this.usersService.getUserById(this.authentificationService.userId).subscribe({
      next: (user: UserModel) => {
        this.currentUser = user;
        this.updateProfile.patchValue({
          username: user.userName,
          email: user.email,
          phone: user.telephone,
        });
        if (user.profileImage) {
          this.displayedImage = user.profileImage
          ? `${this.imageBaseUrl}/${user.profileImage}`
          : 'assets/user-upload-bro.svg';
        }
      },
      error: (err) => {
        console.error('Error loading user:', err);
      }
    });
  }

  onSubmitProfile(): void {
    if (this.updateProfile.invalid || !this.currentUser) return;

    const updatedUser: UserModel = {
      ...this.currentUser,
      userName: this.updateProfile.value.username,
      email: this.updateProfile.value.email,
      telephone: this.updateProfile.value.phone,
    };

    this.usersService.updateUser(updatedUser, this.selectedFile).subscribe({
      next: () => {
        if (updatedUser.profileImage) {
          this.displayedImage = `${this.imageBaseUrl}/${updatedUser.profileImage}`;
        }
      },
      error: (err) => {
        console.error('Error updating user:', err);
        alert('Error updating profile. Please try again.');
      }
    });
  }


  onSubmitPassword(): void {
    if (this.updatePassword.invalid || !this.currentUser) return;
      const newPassword = this.updatePassword.get('newPassword')?.value;
    const confirmPassword = this.updatePassword.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const updatedUser: UserModel = {
      ...this.currentUser,
      motDePasse: newPassword
    };

    this.usersService.updateUserPassword(this.authentificationService.userId, newPassword).subscribe({
      next: () => {
        alert('Password updated successfully!');
        // this.router.navigateByUrl("admin/dashboard");
      },
      error: (err) => {
        console.error('Error updating password:', err);
        alert('Error updating password. Please try again.');
      }
    });
  }


}
