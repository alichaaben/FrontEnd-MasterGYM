import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../../model/user.model';
import { UserService } from '../../services/user.service';

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
  avatar = 'assets/user-upload-bro.svg';
  selectedFile: File | null = null;
  currentUser: UserModel | null = null;

  tabs = [
    { id: 'profile' as const, label: 'Profil Public' },
    { id: 'password' as const, label: 'Mot de Passe' },
  ];

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UserService
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
        this.avatar = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  loadUser(): void {
    this.usersService.getUserById("2").subscribe({
      next: (user: UserModel) => {
        this.currentUser = user;
        this.updateProfile.patchValue({
          username: user.userName,
          email: user.email,
          phone: user.telephone,
        });
        if (user.profileImage) {
          this.avatar = typeof user.profileImage === 'string' ? user.profileImage : this.avatar;
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
        alert('Profile updated successfully!');
        this.router.navigateByUrl("admin/dashboard");
      },
      error: (err) => {
        console.error('Error updating user:', err);
        alert('Error updating profile. Please try again.');
      }
    });
  }

  onSubmitPassword(): void {
    if (this.updateProfile.invalid || !this.currentUser) return;
      const newPassword = this.updateProfile.get('newPassword')?.value;
    const confirmPassword = this.updateProfile.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const updatedUser: UserModel = {
      ...this.currentUser,
      motDePasse: newPassword
    };

    this.usersService.updateUserPassword(2, newPassword).subscribe({
      next: () => {
        alert('Password updated successfully!');
        this.router.navigateByUrl("admin/dashboard");
      },
      error: (err) => {
        console.error('Error updating password:', err);
        alert('Error updating password. Please try again.');
      }
    });
  }


}
