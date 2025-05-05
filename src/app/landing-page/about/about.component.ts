import { Component } from '@angular/core';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {


  trainers = [
    {
      name: 'Sam Piters',
      image: 'assets/trainer-1.jpg',
      profession: 'Weightlifting Coach',
      description: 'Specialized in strength training and weightlifting, Sam helps you build muscle and improve your performance with personalized routines.'
    },
    {
      name: 'Kim Piters',
      image: 'assets/trainer-2.jpg',
      profession: 'Weightlifting Coach',
      description: 'Kim has years of experience helping individuals achieve their weightlifting goals, focusing on technique, strength, and endurance.'
    },
    {
      name: 'Samanta Piters',
      image: 'assets/trainer-3.jpg',
      profession: 'Weightlifting Coach',
      description: 'Samanta is dedicated to providing customized programs to enhance your strength and physique, helping you lift smarter and stronger.'
    },
    {
      name: 'Artur Piters',
      image: 'assets/trainer-4.jpg',
      profession: 'Weightlifting Coach',
      description: 'With a passion for powerlifting and form correction, Artur helps athletes reach their peak performance while minimizing injury risk.'
    },
    {
      name: 'Sam Piters',
      image: 'assets/trainer-1.jpg',
      profession: 'Weightlifting Coach',
      description: 'Specialized in strength training and weightlifting, Sam helps you build muscle and improve your performance with personalized routines.'
    },
    {
      name: 'Kim Piters',
      image: 'assets/trainer-2.jpg',
      profession: 'Weightlifting Coach',
      description: 'Kim has years of experience helping individuals achieve their weightlifting goals, focusing on technique, strength, and endurance.'
    },
    {
      name: 'Samanta Piters',
      image: 'assets/trainer-3.jpg',
      profession: 'Weightlifting Coach',
      description: 'Samanta is dedicated to providing customized programs to enhance your strength and physique, helping you lift smarter and stronger.'
    },
    {
      name: 'Artur Piters',
      image: 'assets/trainer-4.jpg',
      profession: 'Weightlifting Coach',
      description: 'With a passion for powerlifting and form correction, Artur helps athletes reach their peak performance while minimizing injury risk.'
    }
  ];

  stats = [
    { value: '10', label: 'Years of Experience', description: 'A decade of helping people transform their bodies and lives through fitness.' },
    { value: '27', label: 'Trainers', description: 'A diverse and passionate team of trainers ready to guide you to success.' },
    { value: '18', label: 'Clubs', description: 'Our network of gyms provides you with access to top-tier fitness facilities.' }
  ];


  currentPage: number = 1;
  itemsPerPage: number = 4;
  //pageSizes: number[] = [2, 4, 6, 8];

  get paginatedTrainers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.trainers.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.trainers.length / this.itemsPerPage);
  }

  changePageSize(size: number): void {
    this.itemsPerPage = size;
    this.currentPage = 1; // Reset to first page when changing page size
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
