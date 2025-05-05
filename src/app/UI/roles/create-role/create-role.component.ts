import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.css'
})
export class CreateRoleComponent {
  RolesForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    //private usersService: UsersService
  ) {
    this.RolesForm = this.fb.group({
      rolename: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8,12}$/)]],
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }



  onSubmit(): void {
    if (this.RolesForm.invalid) {
      alert('Veuillez remplir tous les champs correctement.');
      return;
    }
  }
}
