// header.component.ts
import { Component, HostListener, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { DarkModeService } from '../services/dark-mode.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isSidebarActive = false;
  showNotifications = false;
  isScrolled = false;
  isMobileView = window.innerWidth <= 900;

  constructor(
    private sharedService: SharedService,
    private darkModeService: DarkModeService
  ) {}

  ngOnInit(): void {
    this.sharedService.currentSidebarState.subscribe((state) => {
      this.isSidebarActive = state;
    });

    if (window.innerWidth <= 900) {
      this.isSidebarActive = false;
      this.sharedService.changeSidebarState(this.isSidebarActive);
    }
  }

  // Toggle dark mode using the service
  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }

  // Get dark mode state from the service
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
    console.log('Menu toggled:', this.isMenuOpen);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  notifications = [
    { title: 'New user registered', time: '2 minutes ago' },
    { title: 'Sales report available', time: '1 hour ago' },
    { title: 'Server update completed', time: '3 hours ago' },
    { title: 'Server update completed', time: '3 hours ago' },
  ];

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.notification-container')) {
      this.showNotifications = false;
    }
  }
}
