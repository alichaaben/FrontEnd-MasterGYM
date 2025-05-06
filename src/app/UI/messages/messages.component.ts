import { Component, OnInit } from '@angular/core';
import { ContactMessage } from '../../model/contact-message.model';
import { ContactMessageService } from '../../services/contact-message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: ContactMessage[] = [];
  filteredMessages: ContactMessage[] = [];
  approvedMessages: ContactMessage[] = [];
  currentFilter: string = 'all';
  searchQuery: string = '';
  showPreviewModal: boolean = false;

  constructor(private messageService: ContactMessageService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.messageService.getAllMessages().subscribe({
      next: (messages) => {
        this.messages = messages;
        this.filterMessages();
        this.updateApprovedMessages();
      },
      error: (err) => {
        console.error('Error loading messages:', err);
      }
    });
  }

  filterMessages(): void {
    if (this.currentFilter === 'all') {
      this.filteredMessages = [...this.messages];
    } else {
      this.messageService.getMessagesByStatus(this.currentFilter).subscribe({
        next: (messages) => {
          this.filteredMessages = messages;
        }
      });
    }

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      this.filteredMessages = this.filteredMessages.filter(m =>
        m.name.toLowerCase().includes(query) ||
        m.email.toLowerCase().includes(query) ||
        m.message.toLowerCase().includes(query)
      );
    }

    this.filteredMessages.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  updateApprovedMessages(): void {
    this.messageService.getApprovedMessages().subscribe({
      next: (messages) => {
        this.approvedMessages = messages.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
    });
  }

  approveMessage(id: number): void {
    this.messageService.approveMessage(id).subscribe({
      next: () => {
        this.loadMessages();
      },
      error: (err) => {
        console.error('Error approving message:', err);
      }
    });
  }

  rejectMessage(id: number): void {
    this.messageService.rejectMessage(id).subscribe({
      next: () => {
        this.loadMessages();
      },
      error: (err) => {
        console.error('Error rejecting message:', err);
      }
    });
  }

  setPending(id: number): void {
    this.messageService.setPending(id).subscribe({
      next: () => {
        this.loadMessages();
      },
      error: (err) => {
        console.error('Error setting message to pending:', err);
      }
    });
  }

  deleteMessage(id: number): void {
    if (confirm('Are you sure you want to delete this message?')) {
      this.messageService.deleteMessage(id).subscribe({
        next: () => {
          this.loadMessages();
        },
        error: (err) => {
          console.error('Error deleting message:', err);
        }
      });
    }
  }

  openPreviewModal(): void {
    this.showPreviewModal = true;
  }

  closePreviewModal(): void {
    this.showPreviewModal = false;
  }
}
