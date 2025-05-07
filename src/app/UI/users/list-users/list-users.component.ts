import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../model/user.model';
import { UserService } from '../../../services/user.service';
import { environment } from '../../../../environments/environment.dev';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  Math = Math;
  imageBaseUrl = `${environment.UrlImages}`;

  // User data
  allUsers: UserModel[] = [];
  displayedUsers: UserModel[] = [];

  // Pagination
  p: number = 1;
  itemsPerPage: number = 5;
  pageSizes: number[] = [5, 10, 20];

  // Search and filter
  searchQuery: string = '';
  currentFilter: string = 'all';
  searchTimeout: any;

  constructor(private usersService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getAllUser().subscribe({
      next: (data: UserModel[]) => {
        this.allUsers = data;
        this.displayedUsers = [...data];
      },
      error: (err) => {
        console.error('Error loading users:', err);
      },
    });
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.usersService.deleteUser(userId).subscribe({
        next: () => {
          this.allUsers = this.allUsers.filter(user => user.id !== userId);
          this.applyFilters();
        },
        error: (err) => {
          console.error(`Error deleting user with ID ${userId}:`, err);
        },
      });
    }
  }

  // Search functionality
  onSearchInput(): void {
    // Debounce the search to avoid too many API calls
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      if (this.searchQuery.trim().length >= 3 || this.searchQuery.trim() === '') {
        this.applyFilters();
      }
    }, 500);
  }

  applyFilters(): void {
    let filtered = [...this.allUsers];

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(user =>
        (user.userName?.toLowerCase().includes(query)) ||
        (user.email?.toLowerCase().includes(query)) ||
        (user.telephone?.toLowerCase().includes(query))
      );
    }

    // Apply role filter
    if (this.currentFilter !== 'all') {
      filtered = filtered.filter(user => user.roleName === this.currentFilter);
    }

    this.displayedUsers = filtered;
    this.p = 1; // Reset to first page
  }

  // Server-side search option
  searchUsers(): void {
    if (this.searchQuery.trim()) {
      this.usersService.searchUsers(this.searchQuery).subscribe({
        next: (users) => {
          this.displayedUsers = users;
          this.p = 1;
        },
        error: (err) => {
          console.error('Error searching users:', err);
        }
      });
    } else {
      this.displayedUsers = [...this.allUsers];
      this.p = 1;
    }
  }

  // Pagination methods
  changePageSize(size: number): void {
    this.itemsPerPage = size;
    this.p = 1;
  }

  get totalPages(): number {
    return Math.ceil(this.displayedUsers.length / this.itemsPerPage);
  }

  getMiddlePages(): number[] {
    const pages = [];
    const start = Math.max(2, this.p - 1);
    const end = Math.min(this.totalPages - 1, this.p + 1);

    for (let i = start; i <= end; i++) {
      if (i > 1 && i < this.totalPages) {
        pages.push(i);
      }
    }
    return pages;
  }
}
