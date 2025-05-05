import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-best-trainer',
  templateUrl: './best-trainer.component.html',
  styleUrls: ['./best-trainer.component.scss']
})
export class BestTrainerComponent implements OnInit, OnDestroy {
  trainers = [
    {
      id: 1,
      name: "Samanta",
      surname: "Piters",
      profession: "weightlifting",
      image: "assets/single-1.jpg",
      link: "#",
    },
    {
      id: 2,
      name: "Artur",
      surname: "Piters",
      profession: "weightlifting",
      image: "assets/single-2.jpg",
      link: "#",
    },
    {
      id: 3,
      name: "Kim",
      surname: "Piters",
      profession: "weightlifting",
      image: "assets/single-3.jpg",
      link: "#",
    },
    {
      id: 4,
      name: "Sam",
      surname: "Piters",
      profession: "weightlifting",
      image: "assets/single-4.jpg",
      link: "#",
    },
    {
      id: 5,
      name: "Anna",
      surname: "Piters",
      profession: "weightlifting",
      image: "assets/single-5.jpg",
      link: "#",
    },
    // Add more trainers as needed
    {
      id: 6,
      name: "Michael",
      surname: "Johnson",
      profession: "cardio",
      image: "assets/single-6.jpg",
      link: "#",
    },
    {
      id: 7,
      name: "Sarah",
      surname: "Williams",
      profession: "yoga",
      image: "assets/single-7.jpg",
      link: "#",
    },
    {
      id: 8,
      name: "David",
      surname: "Brown",
      profession: "crossfit",
      image: "assets/single-8.jpg",
      link: "#",
    }
  ];

  duplicatedTrainers = [...this.trainers, ...this.trainers];
  currentPosition = 0;
  scrollSpeed = 1; // pixels per frame
  isPaused = false;
  hoverPaused = false;
  animationFrameId: number = 0;
  lastTimestamp = 0;

  ngOnInit() {
    this.startAutoScroll();
  }

  ngOnDestroy() {
    this.stopAutoScroll();
  }

  startAutoScroll() {
    this.stopAutoScroll(); // Ensure no duplicates
    const animate = (timestamp: number) => {
      if (!this.lastTimestamp) this.lastTimestamp = timestamp;
      const delta = timestamp - this.lastTimestamp;
      this.lastTimestamp = timestamp;

      if (!this.isPaused && !this.hoverPaused) {
        this.currentPosition += this.scrollSpeed * (delta / 16); // Normalize speed
        if (this.currentPosition >= this.trainers.length * 300) { // 300px per item
          this.currentPosition = 0;
        }
      }

      this.animationFrameId = requestAnimationFrame(animate);
    };
    this.animationFrameId = requestAnimationFrame(animate);
  }

  stopAutoScroll() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  pauseAutoScroll() {
    this.isPaused = true;
  }

  resumeAutoScroll() {
    this.isPaused = false;
  }

  pauseOnHover() {
    this.hoverPaused = true;
  }

  resumeOnHover() {
    this.hoverPaused = false;
  }

  nextSlide() {
    this.currentPosition += 300; // Move by one trainer width
    if (this.currentPosition >= this.trainers.length * 300) {
      this.currentPosition = 0;
    }
  }

  prevSlide() {
    this.currentPosition -= 300; // Move by one trainer width
    if (this.currentPosition < 0) {
      this.currentPosition = (this.trainers.length - 1) * 300;
    }
  }
}
