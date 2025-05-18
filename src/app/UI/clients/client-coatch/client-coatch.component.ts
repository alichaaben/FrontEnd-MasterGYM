import { Component, OnInit } from '@angular/core';
import { CustomerModel } from '../../../model/customer.model';
import { CustomerService } from './../../../services/customer.service';
import { environment } from '../../../../environments/environment.dev';
import { AuthentificationService } from '../../../services/authentification.service';

@Component({
  selector: 'app-client-coatch',
  templateUrl: './client-coatch.component.html',
  styleUrl: './client-coatch.component.css'
})
export class ClientCoatchComponent implements OnInit {
  Math = Math;
  public imageBaseUrl = `${environment.UrlImagesCustomer}`;

  // User data
  allCustomers: CustomerModel[] = [];
  displayedCustomers: CustomerModel[] = [];

  // Pagination
  p: number = 1;
  itemsPerPage: number = 5;
  pageSizes: number[] = [5, 10, 20];

  // Search and filter
  searchQuery: string = '';
  currentFilter: string = 'all';
  searchTimeout: any;

  constructor(private customerService: CustomerService,public authService:AuthentificationService) {}

  ngOnInit(): void {
    this.loadCustomer();
  }

  loadCustomer(): void {
    this.customerService.getAllCustomerByUserId(this.authService.userId).subscribe({
      next: (data: CustomerModel[]) => {
        this.allCustomers = data;
        this.displayedCustomers = [...data];
      },
      error: (err) => {
        console.error('Error loading customer:', err);
      },
    });
  }


  deleteCustomer(customerId: string): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(customerId).subscribe({
        next: () => {
          this.allCustomers = this.allCustomers.filter(customer => customer.id !== customerId);
          this.applyFilters();
        },
        error: (err) => {
          console.error(`Error deleting customer with ID ${customerId}:`, err);
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
    let filtered = [...this.allCustomers];

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(user =>
        (user.userName?.toLowerCase().includes(query)) ||
        (user.email?.toLowerCase().includes(query)) ||
        (user.telephone?.toLowerCase().includes(query))
      );
    }


    this.displayedCustomers = filtered;
    this.p = 1; // Reset to first page
  }

  // Server-side search option
  searchUsers(): void {
    if (this.searchQuery.trim()) {
      this.customerService.searchCustomers(this.searchQuery).subscribe({
        next: (customer) => {
          this.displayedCustomers = customer;
          this.p = 1;
        },
        error: (err) => {
          console.error('Error searching users:', err);
        }
      });
    } else {
      this.displayedCustomers = [...this.allCustomers];
      this.p = 1;
    }
  }

  // Pagination methods
  changePageSize(size: number): void {
    this.itemsPerPage = size;
    this.p = 1;
  }

  get totalPages(): number {
    return Math.ceil(this.displayedCustomers.length / this.itemsPerPage);
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
