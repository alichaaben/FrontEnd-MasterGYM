import { ContactUser } from './../../model/contact-user.model';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  formSubmitted = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      agree: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const messageData: ContactUser = {
        name: this.contactForm.get('name')?.value,
        email: this.contactForm.get('email')?.value,
        message: this.contactForm.get('message')?.value,
        status: 'pending'
      };

      this.contactService.sendMessage(messageData).subscribe({
        next: () => {
          this.formSubmitted = true;
          this.isLoading = false;
          setTimeout(() => {
            this.contactForm.reset();
            this.formSubmitted = false;
          }, 3000);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Failed to send message. Please try again later.';
          console.error('Error sending message:', err);
        }
      });
    }
  }


}
