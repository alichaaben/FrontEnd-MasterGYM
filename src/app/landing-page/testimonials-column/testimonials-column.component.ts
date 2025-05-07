import { Component, Input } from '@angular/core';
import { ContactMessage } from '../../model/contact-message.model';
import { ContactMessageService } from '../../services/contact-message.service';

@Component({
  selector: 'app-testimonials-column',
  templateUrl: './testimonials-column.component.html',
  styleUrl: './testimonials-column.component.css'
})
export class TestimonialsColumnComponent {


    messages: ContactMessage[] = [];

    constructor(private messageService: ContactMessageService) {}

    ngOnInit(): void {
      this.loadMessages();
    }

    loadMessages(): void {
      this.messageService.getMessagesByStatus("APPROVED").subscribe({
        next: (messages) => {
          this.messages = messages;
        },
        error: (err) => {
          console.error('Error loading messages:', err);
        }
      });
    }

  @Input() testimonials: any[] = [];
  @Input() duration: number = 10;

  animationState = 0;


}
