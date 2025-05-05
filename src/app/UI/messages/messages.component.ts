import { Component, OnInit } from '@angular/core';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: Date;
  status: 'approved' | 'pending' | 'rejected';
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  // Sample data for demonstration
  messages: ContactMessage[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      message: 'I really enjoyed the training session last week. The instructor was knowledgeable and the facility was top-notch!',
      date: new Date('2023-06-15'),
      status: 'approved'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      message: 'Looking forward to joining your yoga classes next month. Do you offer beginner sessions?',
      date: new Date('2023-06-18'),
      status: 'pending'
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      message: 'The equipment in your gym needs maintenance. Several machines were not working properly during my visit.',
      date: new Date('2023-06-20'),
      status: 'rejected'
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      message: 'Best training center in town! The staff is friendly and the atmosphere is motivating.',
      date: new Date('2023-06-22'),
      status: 'approved'
    }
  ];

  filteredMessages: ContactMessage[] = [];
  approvedMessages: ContactMessage[] = [];
  currentFilter: string = 'all';
  searchQuery: string = '';
  showPreviewModal: boolean = false;

  // Sample messages for adding new test messages
  private sampleMessages: Omit<ContactMessage, 'id' | 'date'>[] = [
    {
      name: 'Alex Turner',
      email: 'alex.t@example.com',
      message: 'The personal training sessions have been transformative. Highly recommend!',
      status: 'pending'
    },
    {
      name: 'Jessica Wong',
      email: 'jessica.w@example.com',
      message: 'Do you offer nutritional counseling along with the training programs?',
      status: 'pending'
    },
    {
      name: 'David Miller',
      email: 'david.m@example.com',
      message: 'The group classes are fun and energetic. Great way to stay motivated!',
      status: 'pending'
    }
  ];

  ngOnInit(): void {
    this.filterMessages();
    this.updateApprovedMessages();
  }

  filterMessages(): void {
    // Filter by status
    if (this.currentFilter === 'all') {
      this.filteredMessages = [...this.messages];
    } else {
      this.filteredMessages = this.messages.filter(m => m.status === this.currentFilter);
    }

    // Filter by search query
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      this.filteredMessages = this.filteredMessages.filter(m =>
        m.name.toLowerCase().includes(query) ||
        m.email.toLowerCase().includes(query) ||
        m.message.toLowerCase().includes(query)
      );
    }

    // Sort by date (newest first)
    this.filteredMessages.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  updateApprovedMessages(): void {
    this.approvedMessages = this.messages.filter(m => m.status === 'approved')
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  // Message status actions
  approveMessage(id: string): void {
    const message = this.messages.find(m => m.id === id);
    if (message) {
      message.status = 'approved';
      this.filterMessages();
      this.updateApprovedMessages();
    }
  }

  rejectMessage(id: string): void {
    const message = this.messages.find(m => m.id === id);
    if (message) {
      message.status = 'rejected';
      this.filterMessages();
      this.updateApprovedMessages();
    }
  }

  setPending(id: string): void {
    const message = this.messages.find(m => m.id === id);
    if (message) {
      message.status = 'pending';
      this.filterMessages();
      this.updateApprovedMessages();
    }
  }

  deleteMessage(id: string): void {
    if (confirm('Are you sure you want to delete this message?')) {
      this.messages = this.messages.filter(m => m.id !== id);
      this.filterMessages();
      this.updateApprovedMessages();
    }
  }

  // Preview modal
  openPreviewModal(): void {
    this.showPreviewModal = true;
  }

  closePreviewModal(): void {
    this.showPreviewModal = false;
  }

  // Sample function to simulate receiving a new message (for demo purposes)
  addSampleMessage(): void {
    const randomMessage = this.sampleMessages[Math.floor(Math.random() * this.sampleMessages.length)];

    const newMessage: ContactMessage = {
      id: Math.random().toString(36).substring(2, 9),
      ...randomMessage,
      date: new Date()
    };

    this.messages.unshift(newMessage);
    this.filterMessages();
  }
}
