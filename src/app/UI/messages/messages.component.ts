import { Component, OnInit } from '@angular/core';
import { ContactMessage } from '../../model/contact-message.model';
import { ContactMessageService } from '../../services/contact-message.service';
import { ActivatedRoute } from '@angular/router';

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
  Math = Math;

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];

  constructor(
    private messageService: ContactMessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['selectedMessage']) {
        const messageId = params['selectedMessage'];
        this.highlightMessage(messageId);
      }
    });
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
          this.applySearchFilter();
        }
      });
      return;
    }

    this.applySearchFilter();
  }

  applySearchFilter(): void {
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

    // Reset to first page when filtering
    this.currentPage = 1;
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

  // Pagination methods
  get paginatedMessages(): ContactMessage[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredMessages.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredMessages.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  changePageSize(size: number): void {
    this.itemsPerPage = size;
    this.currentPage = 1;
  }

  getMiddlePages(): number[] {
    const pages = [];
    const start = Math.max(2, this.currentPage - 1);
    const end = Math.min(this.totalPages - 1, this.currentPage + 1);

    for (let i = start; i <= end; i++) {
      if (i > 1 && i < this.totalPages) {
        pages.push(i);
      }
    }
    return pages;
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

  highlightMessage(messageId: string) {
    const element = document.getElementById(`message-${messageId}`);
    if (element) {
      // First reset to page 1 if not already there
      this.currentPage = 1;
      // Then scroll to element after a small delay to allow page change
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
        element.classList.add('bg-yellow-100');
        setTimeout(() => element.classList.remove('bg-yellow-100'), 2000);
      }, 100);
    }
  }
}
