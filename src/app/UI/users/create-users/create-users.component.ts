import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../../model/user.model';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent {
  userForm: FormGroup;
  selectedFile: File | null = null;
  previewImage: string | null = null;
  showCameraModal = false;
  capturedImage: string | null = null;
  private stream: MediaStream | null = null;

  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usersService: UserService
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      roles: ['', Validators.required],
      description: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8,12}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  handleImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        alert('Invalid file type. Please upload JPEG, PNG, or GIF.');
        return;
      }

      if (file.size > maxSize) {
        alert('File too large. Max size is 5MB.');
        return;
      }

      this.selectedFile = file;
      const reader = new FileReader();
      reader.onloadend = () => {
        this.previewImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  clearPreviewImage(): void {
    this.previewImage = null;
    this.selectedFile = null;

    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      alert('Please complete the form correctly.');
      return;
    }

    if (!this.previewImage) {
      alert('Please upload or take a photo.');
      return;
    }

    const newUser: UserModel = {
      id: '',
      userName: this.userForm.get('username')?.value,
      email: this.userForm.get('email')?.value,
      telephone: this.userForm.get('phone')?.value,
      motDePasse: this.userForm.get('password')?.value,
      roleName: this.userForm.get('roles')?.value,
      description: this.userForm.get('description')?.value,
      profileImage: null
    };

    const profileImage = this.selectedFile;

    this.usersService.addUser(newUser, profileImage).subscribe({
      next: () => {
        this.userForm.reset();
        this.clearPreviewImage();
        this.router.navigateByUrl('admin/users');
      },
      error: (err) => {
        console.error('Error creating user:', err);
        alert('Error creating user. Please try again later.');
      }
    });
  }
}
