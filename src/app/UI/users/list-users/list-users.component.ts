import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../model/user.model';
import { UserService } from '../../../services/user.service';
import { environment } from '../../../../environments/environment.dev';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent implements OnInit {
  Math= Math;

  public recuperUser: UserModel[] = [];
  public imageBaseUrl = `${environment.UrlImages}`;

  constructor(private usersService: UserService) {}

  //get all users
  ngOnInit(): void {
    this.usersService.getAllUser().subscribe({
      next: (data: UserModel[]) => {
        this.recuperUser = data;
      },
      error: (err) => {
        console.error('Error loading users:', err);
      },
    });
  }

  //Edit User
  editUser(userId: string): void {
    console.log('Edit user with ID:', userId);
  }

  //delete User
  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.usersService.deleteUser(userId).subscribe({
        next: () => {
          this.recuperUser = this.recuperUser.filter(user => user.id !== userId);
        },
        error: (err) => {
          console.error(`Error deleting user with ID : ${userId}:`, err);
        },
      });
    }
  }


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
    return Math.ceil(this.recuperUser.length / this.itemsPerPage);
  }


}
