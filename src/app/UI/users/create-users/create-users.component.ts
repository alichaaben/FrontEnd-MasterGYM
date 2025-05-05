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
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8,12}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async openCamera(): Promise<void> {
    this.showCameraModal = true;
    this.capturedImage = null;

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false
      });
      this.videoElement.nativeElement.srcObject = this.stream;
      await new Promise(resolve => setTimeout(resolve, 100)); // Small delay to ensure video is ready
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Camera access denied or not available.');
      this.closeCamera();
    }
  }

  closeCamera(): void {
    this.showCameraModal = false;
    this.capturedImage = null;

    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }

    if (this.videoElement?.nativeElement) {
      this.videoElement.nativeElement.srcObject = null;
    }
  }

  capturePhoto(): void {
    if (!this.videoElement || !this.canvasElement) {
      console.error('Video or Canvas element not found');
      return;
    }

    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;

    // Make sure video is actually playing and has dimensions
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      console.error('Video not ready for capture');
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.capturedImage = canvas.toDataURL('image/png');
      console.log('Photo captured successfully');
    } else {
      console.error('Could not get canvas context');
    }
  }

  retakePhoto(): void {
    this.capturedImage = null;
  }


  useCapturedPhoto(): void {
    if (this.capturedImage) {
      try {
        const blob = this.dataURItoBlob(this.capturedImage);
        this.previewImage = this.capturedImage;

        // Obtenir le nom d'utilisateur du formulaire
        const username = 'MasterGYM';
        const sanitizedUsername = username.trim().toLowerCase().replace(/[^a-z0-9]/gi, '_');

        // Obtenir la date et l'heure actuelles formatées
        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 19).replace(/[:T]/g, '-');

        // Créer le nom du fichier avec l'utilisateur et la date
        const filename = `captured-photo_${sanitizedUsername}_${formattedDate}.png`;

        // Créer le fichier
        this.selectedFile = new File([blob], filename, { type: 'image/png' });

        this.closeCamera();
      } catch (e) {
        console.error('Failed to convert captured image:', e);
        alert('Failed to process captured image.');
      }
    } else {
      alert('No image captured.');
    }
  }



  // Helper function to convert data URI to Blob
  private dataURItoBlob(dataURI: string | null): Blob {
    if (!dataURI || !dataURI.includes(',')) {
      throw new Error('Invalid data URI');
    }

    const parts = dataURI.split(',');
    const byteString = atob(parts[1]);
    const mimeString = parts[0].split(':')[1].split(';')[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
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
