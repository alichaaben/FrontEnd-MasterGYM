import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../model/user.model';
import { environment } from '../../../environments/environment.dev';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{

  public imageBaseUrl = `${environment.UrlImages}`;
  public recuperUser: UserModel[] = [];

  constructor(private userService: UserService) {}

    //get all users
    ngOnInit(): void {
      this.userService.getAllByRoleName('ROLE_Coach').subscribe({
        next: (data: UserModel[]) => {
          this.recuperUser = data;
        },
        error: (err) => {
          console.error('Error loading users:', err);
        },
      });
    }



  stats = [
    { value: '10', label: 'Years of Experience', description: 'A decade of helping people transform their bodies and lives through fitness.' },
    { value: '27', label: 'Trainers', description: 'A diverse and passionate team of trainers ready to guide you to success.' },
    { value: '18', label: 'Clubs', description: 'Our network of gyms provides you with access to top-tier fitness facilities.' }
  ];


  currentPage: number = 1;
  itemsPerPage: number = 4;

  get paginatedTrainers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.recuperUser.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.recuperUser.length / this.itemsPerPage);
  }

  changePageSize(size: number): void {
    this.itemsPerPage = size;
    this.currentPage = 1;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getMiddlePages(): number[] {
    const pages = [];
    const start = Math.max(2, this.currentPage - 1);
    const end = Math.min(this.totalPages - 1, this.currentPage + 1);

    for (let i = start; i <= end; i++) {
      if (i > 1 && i < this.totalPages) {
        pages.push(i);
      }
    }
    return pages;
  }
}
