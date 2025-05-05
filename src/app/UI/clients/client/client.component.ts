import { Component } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  Math = Math;


  // Liste des utilisateurs (exemple)
  customers = [
    { image: 'assets/Ali2.jpg', name: 'userName1', email: 'email1@example.com', role: 'roleName1', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName2', email: 'email2@example.com', role: 'roleName2', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName3', email: 'email1@example.com', role: 'roleName1', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName4', email: 'email2@example.com', role: 'roleName2', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName5', email: 'email1@example.com', role: 'roleName1', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName6', email: 'email2@example.com', role: 'roleName2', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName7', email: 'email1@example.com', role: 'roleName1', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName8', email: 'email2@example.com', role: 'roleName2', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName9', email: 'email1@example.com', role: 'roleName1', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName10', email: 'email2@example.com', role: 'roleName2', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName11', email: 'email1@example.com', role: 'roleName1', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName12', email: 'email2@example.com', role: 'roleName2', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName13', email: 'email1@example.com', role: 'roleName1', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName14', email: 'email2@example.com', role: 'roleName2', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName15', email: 'email1@example.com', role: 'roleName1', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName16', email: 'email2@example.com', role: 'roleName2', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName17', email: 'email1@example.com', role: 'roleName1', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName18', email: 'email2@example.com', role: 'roleName2', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName19', email: 'email1@example.com', role: 'roleName1', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName20', email: 'email2@example.com', role: 'roleName2', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName1', email: 'email1@example.com', role: 'roleName1', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName2', email: 'email2@example.com', role: 'roleName2', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName3', email: 'email1@example.com', role: 'roleName1', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName4', email: 'email2@example.com', role: 'roleName2', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName5', email: 'email1@example.com', role: 'roleName1', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName6', email: 'email2@example.com', role: 'roleName2', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName7', email: 'email1@example.com', role: 'roleName1', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName8', email: 'email2@example.com', role: 'roleName2', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName9', email: 'email1@example.com', role: 'roleName1', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName10', email: 'email2@example.com', role: 'roleName2', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName11', email: 'email1@example.com', role: 'roleName1', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName12', email: 'email2@example.com', role: 'roleName2', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName13', email: 'email1@example.com', role: 'roleName1', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName14', email: 'email2@example.com', role: 'roleName2', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName15', email: 'email1@example.com', role: 'roleName1', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName16', email: 'email2@example.com', role: 'roleName2', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName17', email: 'email1@example.com', role: 'roleName1', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName18', email: 'email2@example.com', role: 'roleName2', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName19', email: 'email1@example.com', role: 'roleName1', phone: '1234567890' },
    { image: 'assets/Ali2.jpg', name: 'userName20', email: 'email2@example.com', role: 'roleName2', phone: '1234567890' },
  ];

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
  return Math.ceil(this.customers.length / this.itemsPerPage);
}


}
