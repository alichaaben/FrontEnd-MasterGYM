import { Component } from '@angular/core';

@Component({
  selector: 'app-best-trainer',
  templateUrl: './best-trainer.component.html',
  styleUrls: ['./best-trainer.component.scss']
})
export class BestTrainerComponent {
  startIndex = 0;
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
    }
  ];

  get visibleTrainers() {
    return this.trainers.slice(this.startIndex, this.startIndex + 5);
  }

  nextSlide() {
    this.startIndex = (this.startIndex + 1) % Math.max(1, this.trainers.length - 4);
  }

  prevSlide() {
    this.startIndex = this.startIndex === 0 ? Math.max(0, this.trainers.length - 5) : this.startIndex - 1;
  }
}
