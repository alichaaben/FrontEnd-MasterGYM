import { Component, HostListener } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  isActive = false;
  activeMenuItem: number | null = null; // Persist the active menu item
  isSidebarActive: boolean = false;
  isSubMenuHovered: boolean = false; // Track if the submenu is being hovered

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.currentSidebarState.subscribe((state) => {
      this.isSidebarActive = state;
    });
  }

  toggleSidebar(): void {
    this.isSidebarActive = !this.isSidebarActive;
    this.sharedService.changeSidebarState(this.isSidebarActive);
  }

  toggleMenuItem(index: number, event: Event): void {
    event.stopPropagation(); // Prevent event bubbling
    this.activeMenuItem = this.activeMenuItem === index ? null : index;
  }

  onSubMenuMouseEnter(): void {
    this.isSubMenuHovered = true; // Set hover state to true
  }

  onSubMenuMouseLeave(): void {
    this.isSubMenuHovered = false; // Set hover state to false
    this.closeSubMenu(); // Close the submenu after a short delay
  }

  closeSubMenu(): void {
    setTimeout(() => {
      if (!this.isSubMenuHovered) {
        this.activeMenuItem = null; // Close the submenu if not hovered
      }
    }, 250); // Adjust the delay as needed
  }

}
