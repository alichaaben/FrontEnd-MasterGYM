import { Component } from '@angular/core';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})

export class HeroComponent {
  currentSlide = 0;
  slides = [
    {
      id: 1,
      image: 'assets/slide-1.jpg',
      title: 'Digital Prism',
      description: 'Where geometry meets art in a stunning display of light and form.'
    },
    {
      id: 2,
      image: 'assets/slide-2.jpg',
      title: 'Tech Haven',
      description: 'Immerse yourself in the cutting edge of technology and innovation.'
    },
    {
      id: 3,
      image: 'assets/slide-3.jpg',
      title: 'Neural Dreams',
      description: 'AI-generated masterpieces that blur the line between human and machine creativity.'
    }
  ];
  titleSpan = 'YOURSELF';
  text = 'Maecenas consequat ex id lobortis venenatis. Mauris id erat enim. Morbi dolor dolor, auctor tincidunt lorem ut, venenatis dapibus mi. Nunc venenatis sollicitudin nisl vel auctor.';
  private autoAdvanceTimer: any;
  private touchStartX = 0;

  ngOnInit() {
    this.resetAutoAdvance();
  }

  ngOnDestroy() {
    clearInterval(this.autoAdvanceTimer);
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    const touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe(touchEndX);
  }

  handleSwipe(touchEndX: number) {
    const swipeThreshold = 50;
    const diff = this.touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }

  getSlideClass(index: number): string {
    if (index === this.currentSlide) {
      return 'active';
    } else if (index === (this.currentSlide + 1) % this.slides.length) {
      return 'next';
    } else if (index === (this.currentSlide - 1 + this.slides.length) % this.slides.length) {
      return 'prev';
    } else {
      return 'hidden';
    }
  }

  resetAutoAdvance() {
    clearInterval(this.autoAdvanceTimer);
    this.autoAdvanceTimer = setInterval(() => this.nextSlide(), 5000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.resetAutoAdvance();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.resetAutoAdvance();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.resetAutoAdvance();
  }

  getProgressWidth(): string {
    return `${((this.currentSlide + 1) / this.slides.length) * 100}%`;
  }
}
