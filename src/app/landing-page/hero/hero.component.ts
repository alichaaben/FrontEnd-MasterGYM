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
      title: 'Strength Zone',
      description: 'Push your limits and build power with every rep and every set.'
    },
    {
      id: 2,
      image: 'assets/slide-2.jpg',
      title: 'Cardio Pulse',
      description: 'Ignite your energy and boost endurance with heart-pumping workouts.'
    },
    {
      id: 3,
      image: 'assets/slide-3.jpg',
      title: 'Focus & Form',
      description: 'Train smart, stay disciplined, and master your movement.'
    }
  ];
  titleSpan = 'YOURSELF';
  text = 'Unleash your full potential with targeted workouts, expert guidance, and a community that motivates you to be your best.';
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
