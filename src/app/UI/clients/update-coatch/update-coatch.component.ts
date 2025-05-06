import { CustomerService } from './../../../services/customer.service';
import { CustomerModel } from './../../../model/customer.model';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-coatch',
  templateUrl: './update-coatch.component.html',
  styleUrl: './update-coatch.component.css'
})
export class UpdateCoatchComponent {
  updateForm: FormGroup;
  customerId!: string;
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
      private customerService: CustomerService
    ) {
      this.updateForm = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8,12}$/)]],
        pack: ['', [Validators.required]],
        montPay: ['', [Validators.required]],
        dateDebut: ['', [Validators.required]],
        dateFin: ['', [Validators.required]],
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
        this.customerId = this.route.snapshot.paramMap.get('id')!;
        this.loadCustomer();
      }

      loadCustomer(): void {
        this.customerService.getCustomerById(this.customerId).subscribe({
          next: (customer: CustomerModel) => {
            this.updateForm.patchValue({
              username:customer.userName,
              email: customer.email,
              phone: customer.telephone,
              pack: customer.pack,
              dateDebut: customer.dateDebut,
              dateFin: customer.dateFin,
              montPay: customer.montPay,
            });
          },


          error: (err) => {
            console.error('Error loading customer:', err);
          }
        });
      }

      onSubmit(): void {
        const updateCustomer: CustomerModel = {
          id: this.customerId,
          userId: 2,
          userName: this.updateForm.get('username')?.value,
          email: this.updateForm.get('email')?.value,
          telephone: this.updateForm.get('phone')?.value,
          pack: this.updateForm.get('pack')?.value,
          dateDebut: this.updateForm.get('dateDebut')?.value,
          dateFin: this.updateForm.get('dateFin')?.value,
          montPay: this.updateForm.get('montPay')?.value,
          profileImage: this.selectedFile,
        };

        const profileImage = this.selectedFile || null;

        this.customerService.updateCustomer(updateCustomer, profileImage).subscribe({
          next: () => {
            this.router.navigateByUrl("admin/customer-coatch");
          },
          error: (err) => {
            console.error('Error updating customer:', err);
          }
        });
      }


}
