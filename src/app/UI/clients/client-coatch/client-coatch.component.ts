import { Component, OnInit } from '@angular/core';
import { CustomerModel } from '../../../model/customer.model';
import { CustomerService } from './../../../services/customer.service';
import { environment } from '../../../../environments/environment.dev';

@Component({
  selector: 'app-client-coatch',
  templateUrl: './client-coatch.component.html',
  styleUrl: './client-coatch.component.css'
})
export class ClientCoatchComponent implements OnInit {
  Math = Math;

  public recuperCustomer: CustomerModel[] = [];
  public imageBaseUrl = `${environment.UrlImagesCustomer}`;

  constructor(private customerService: CustomerService) {}

  //get all users
  ngOnInit(): void {
    this.customerService.getAllCustomerByUserId('2').subscribe({
      next: (data: CustomerModel[]) => {
        this.recuperCustomer = data;
      },
      error: (err) => {
        console.error('Error loading customers:', err);
      },
    });
  }

  //Edit User
  // editCustomer(customerId: string): void {
  //   console.log('Edit user with ID:', customerId);
  // }

  //delete User
  // deleteCustomer(customerId: string): void {
  //   if (confirm('Are you sure you want to delete this customer?')) {
  //     this.customerService.deleteCustomer(customerId).subscribe({
  //       next: () => {
  //         this.recuperCustomer = this.recuperCustomer.filter(user => user.id !== customerId);
  //       },
  //       error: (err) => {
  //         console.error(`Error deleting customer with ID : ${customerId}:`, err);
  //       },
  //     });
  //   }
  // }

  p: number = 1; // Current page
  itemsPerPage: number = 5; // Items per page
  pageSizes: number[] = [5, 10, 20]; // Page size options


  changePageSize(size: number): void {
    this.itemsPerPage = size;
    this.p = 1; // Reset to first page
  }

  getPages(): number[] {
    const totalPages = this.totalPages;
    return Array.from({ length: totalPages }, (_, i) => i + 1);
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

  get totalPages(): number {
    return Math.ceil(this.recuperCustomer.length / this.itemsPerPage);
  }

}
