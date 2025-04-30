import { Component } from '@angular/core';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  

  trainers = [
    {
      name: 'Sam piters',
      image: 'assets/trainer-1.jpg',
      profession: 'Weightlifting',
      description: 'Maecenas consequat ex id lobortis venenatis. Mauris id erat enim. Morbi dolor dolor, auctor tincidunt lorem ut, venenatis dapibus miq.'
    },
    {
      name: 'kim piters',
      image: 'assets/trainer-2.jpg',
      profession: 'Weightlifting',
      description: 'Maecenas consequat ex id lobortis venenatis. Mauris id erat enim. Morbi dolor dolor, auctor tincidunt lorem ut, venenatis dapibus miq.'
    },
    {
      name: 'Samanta piters',
      image: 'assets/trainer-3.jpg',
      profession: 'Weightlifting',
      description: 'Maecenas consequat ex id lobortis venenatis. Mauris id erat enim. Morbi dolor dolor, auctor tincidunt lorem ut, venenatis dapibus miq.'
    },
    {
      name: 'artur piters',
      image: 'assets/trainer-4.jpg',
      profession: 'Weightlifting',
      description: 'Maecenas consequat ex id lobortis venenatis. Mauris id erat enim. Morbi dolor dolor, auctor tincidunt lorem ut, venenatis dapibus miq.'
    },
    {
      name: 'Sam piters',
      image: 'assets/trainer-1.jpg',
      profession: 'Weightlifting',
      description: 'Maecenas consequat ex id lobortis venenatis. Mauris id erat enim. Morbi dolor dolor, auctor tincidunt lorem ut, venenatis dapibus miq.'
    },
    {
      name: 'kim piters',
      image: 'assets/trainer-2.jpg',
      profession: 'Weightlifting',
      description: 'Maecenas consequat ex id lobortis venenatis. Mauris id erat enim. Morbi dolor dolor, auctor tincidunt lorem ut, venenatis dapibus miq.'
    },
    {
      name: 'Samanta piters',
      image: 'assets/trainer-3.jpg',
      profession: 'Weightlifting',
      description: 'Maecenas consequat ex id lobortis venenatis. Mauris id erat enim. Morbi dolor dolor, auctor tincidunt lorem ut, venenatis dapibus miq.'
    },
    {
      name: 'artur piters',
      image: 'assets/trainer-4.jpg',
      profession: 'Weightlifting',
      description: 'Maecenas consequat ex id lobortis venenatis. Mauris id erat enim. Morbi dolor dolor, auctor tincidunt lorem ut, venenatis dapibus miq.'
    }
  ];

  stats = [
    { value: '10', label: 'years', description: 'Facilis voluptas harum natus enim dolorum dolores' },
    { value: '27', label: 'trainer', description: 'But I must explain to you all this mistaken idea of' },
    { value: '18', label: 'club', description: 'Nor again is there anyone who loves or pursues or' }
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
