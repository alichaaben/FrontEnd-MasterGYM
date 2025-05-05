import { Component } from '@angular/core';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrl: './list-role.component.css'
})
export class ListRoleComponent {
  Math = Math;

    // Liste des utilisateurs (exemple)
    roles = [
      { id:1,roleName: 'Admin', description: 'Administrator role with full access', createdAt: '2023-01-01' },
      { id:2,roleName: 'User', description: 'Standard user role with limited access', createdAt: '2023-01-02' },
      { id:3,roleName: 'Manager', description: 'Manager role with team management access', createdAt: '2023-01-03' },
      { id:4,roleName: 'Editor', description: 'Editor role with content editing access', createdAt: '2023-01-04' },
      { id:5,roleName: 'Viewer', description: 'Viewer role with read-only access', createdAt: '2023-01-05' },
      { id:6,roleName: 'Guest', description: 'Guest role with minimal access', createdAt: '2023-01-06' },

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
    return Math.ceil(this.roles.length / this.itemsPerPage);
  }


}
