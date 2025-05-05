import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private isDarkMode = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    // Vérifie si on est dans un navigateur
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const darkMode = localStorage.getItem('darkMode');
      this.isDarkMode = darkMode === 'true';
      this.applyDarkMode(this.isDarkMode);
    }
  }

  // Toggle dark mode
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;

    if (this.isBrowser) {
      localStorage.setItem('darkMode', this.isDarkMode.toString());
    }

    this.applyDarkMode(this.isDarkMode);
  }

  // Get current dark mode state
  getDarkMode(): boolean {
    return this.isDarkMode;
  }

  // Apply dark mode to the body
  private applyDarkMode(isDarkMode: boolean): void {
    if (this.isBrowser && document) {
      document.body.classList.toggle('dark', isDarkMode);
    }
  }
}
