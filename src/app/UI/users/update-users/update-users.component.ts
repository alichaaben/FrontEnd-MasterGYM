import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../../model/user.model';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrl: './update-users.component.css'
})
export class UpdateUsersComponent {
  updateForm: FormGroup;
  userId!: string;
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
    private route: ActivatedRoute,
    private usersService: UserService
  ) {
    this.updateForm = this.fb.group({
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

    ngOnInit(): void {
      this.userId = this.route.snapshot.paramMap.get('id')!;
      this.loadUser();
    }

    loadUser(): void {
      this.usersService.getUserById(this.userId).subscribe({
        next: (user: UserModel) => {
          this.updateForm.patchValue({
            username: user.userName,
            email: user.email,
            phone: user.telephone,
            roles: user.roleName,
            description: user.description,
            password: user.motDePasse,
          });
        },


        error: (err) => {
          console.error('Error loading user:', err);
        }
      });
    }

    onSubmit(): void {
      const updatedUser: UserModel = {
        id: this.userId,
        userName: this.updateForm.value.username,
        email: this.updateForm.value.email,
        telephone: this.updateForm.value.phone,
        motDePasse: this.updateForm.value.password,
        roleName: this.updateForm.value.roles,
        description: this.updateForm.value.description,
        profileImage: this.selectedFile,
      };

      const profileImage = this.selectedFile || null;

      this.usersService.updateUser(updatedUser, profileImage).subscribe({
        next: () => {
          this.router.navigateByUrl("admin/users");
        },
        error: (err) => {
          console.error('Error updating user:', err);
        }
      });
    }


    onSubmitm(): void {
      if (this.updateForm.invalid) {
        alert('Please complete the form correctly.');
        return;
      }

      const updatedUser: UserModel = {
        id: this.userId,
        userName: this.updateForm.get('username')?.value,
        email: this.updateForm.get('email')?.value,
        telephone: this.updateForm.get('phone')?.value,
        motDePasse: this.updateForm.get('password')?.value,
        roleName: this.updateForm.get('roles')?.value,
        description: this.updateForm.get('description')?.value,
        profileImage: null
      };

      const profileImage = this.selectedFile;

      this.usersService.updateUser(updatedUser, profileImage).subscribe({
        next: () => {
          this.router.navigateByUrl('admin/users');
        },
        error: (err) => {
          console.error('Error updating user:', err);
          alert('Error updating user. Please try again later.');
        }
      });
    }

}
