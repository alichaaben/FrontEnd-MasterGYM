import { Component, HostListener, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { DarkModeService } from '../services/dark-mode.service';
import { ContactMessage } from '../../model/contact-message.model';
import { ContactMessageService } from '../../services/contact-message.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [DatePipe]
})
export class HeaderComponent implements OnInit {
  messages: ContactMessage[] = [];
  isMenuOpen = false;
  isSidebarActive = false;
  showNotifications = false;
  isScrolled = false;
  isMobileView = window.innerWidth <= 900;

  constructor(
    private sharedService: SharedService,
    private darkModeService: DarkModeService,
    private messageService: ContactMessageService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sharedService.currentSidebarState.subscribe((state) => {
      this.isSidebarActive = state;
    });

    if (window.innerWidth <= 900) {
      this.isSidebarActive = false;
      this.sharedService.changeSidebarState(this.isSidebarActive);
    }
    this.loadMessages();

    setInterval(() => this.loadMessages(), 300000);
  }

  loadMessages(): void {
    this.messageService.getMessagesByStatus("PENDING").subscribe({
      next: (messages) => {
        this.messages = messages.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      },
      error: (err) => {
        console.error('Error loading messages:', err);
      }
    });
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }

  get isDarkMode(): boolean {
    return this.darkModeService.getDarkMode();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (window.innerWidth > 900) {
      this.isSidebarActive = true;
    } else {
      this.isSidebarActive = false;
    }
    this.sharedService.changeSidebarState(this.isSidebarActive);
    this.isMobileView = window.innerWidth <= 900;
  }

  toggleSidebar(): void {
    this.isSidebarActive = !this.isSidebarActive;
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    if (sidebar) {
      sidebar.classList.toggle('active', this.isSidebarActive);
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.loadMessages();
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.notification-container')) {
      this.showNotifications = false;
    }
  }

  viewMessage(messageId: string): void {
    this.showNotifications = false;
    this.router.navigate(['/admin/contact-msg'], {
      queryParams: { selectedMessage: messageId },
      state: { scrollToMessage: true }
    });
  }
}
