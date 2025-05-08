import { Component, HostListener } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { UserModel } from '../../model/user.model';
import { UserService } from '../../services/user.service';
import { AuthentificationService } from '../../services/authentification.service';
import { environment } from '../../../environments/environment.dev';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  isActive = false;
  activeMenuItem: number | null = null;
  isSidebarActive: boolean = false;
  isSubMenuHovered: boolean = false;
  Users: UserModel | null = null;
  displayedUsers: UserModel[] = [];

  imageBaseUrl = `${environment.UrlImages}`;

  constructor(private sharedService: SharedService,public authService:AuthentificationService,private usersService: UserService,) {}


  ngOnInit(): void {
    this.sharedService.currentSidebarState.subscribe((state) => {
      this.isSidebarActive = state;
    });
    this.loadUsers();
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

  handelLogout(){
    this.authService.logout();
  }

  isAuthorized(roles: string[] | undefined): boolean {
    if (!roles) {
      return true;
    }
    return roles.some(role => this.authService.roles.includes(role));
  }


  loadUsers(): void {
    this.usersService.getUserById(this.authService.userId).subscribe({
      next: (data: UserModel) => {
        this.Users = data;
      },
      error: (err) => {
        console.error('Error loading users:', err);
      },
    });
  }

}
