import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  currentSection = 0;
  isScrolling = false;
  sections = [
    {
      id: 1,
      title: 'Modern Architecture',
      subtitle: '01 / VISION',
      description: 'Exploring the intersection of form and function in contemporary design.',
      image: 'assets/slide-1.jpg',
      alt: 'Architectural detail',
      bgColor: 'bg-neutral-950'
    },
    {
      id: 2,
      title: 'Urban Spaces',
      subtitle: '02 / DESIGN',
      description: 'Creating environments that inspire and transform daily life.',
      image: 'assets/slide-2.jpg',
      alt: 'Urban landscape',
      bgColor: 'bg-neutral-900'
    },
    {
      id: 3,
      title: 'Interior Flow',
      subtitle: '03 / SPACE',
      description: 'Harmonizing space and light to create immersive experiences.',
      image: 'assets/slide-3.jpg',
      alt: 'Minimalist interior',
      bgColor: 'bg-neutral-950'
    }
  ];

  ngOnInit() {
    // Initialize animations
    setTimeout(() => {
      this.updateDots(0);
    }, 100);
  }

  ngAfterViewInit() {
    this.setupScrollListener();
  }

  setupScrollListener() {
    this.scrollContainer.nativeElement.addEventListener('scroll', () => {
      if (!this.isScrolling) {
        const scrollPosition = this.scrollContainer.nativeElement.scrollTop;
        const sectionHeight = window.innerHeight;
        this.currentSection = Math.round(scrollPosition / sectionHeight);
        this.updateDots(this.currentSection);
      }
    });
  }

  scrollToSection(index: number) {
    if (!this.isScrolling) {
      this.isScrolling = true;
      this.currentSection = index;
      const section = this.scrollContainer.nativeElement.children[index];
      section.scrollIntoView({ behavior: 'smooth' });
      this.updateDots(index);

      setTimeout(() => {
        this.isScrolling = false;
      }, 1000);
    }
  }

  updateDots(index: number) {
    this.currentSection = index;
  }

  @HostListener('window:resize')
  onWindowResize() {
    // Recalculate positions on resize
    this.scrollToSection(this.currentSection);
  }

}
