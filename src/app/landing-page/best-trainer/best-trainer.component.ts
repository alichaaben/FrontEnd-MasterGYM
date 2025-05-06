import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../model/user.model';
import { environment } from '../../../environments/environment.dev';

@Component({
  selector: 'app-best-trainer',
  templateUrl: './best-trainer.component.html',
  styleUrls: ['./best-trainer.component.scss']
})
export class BestTrainerComponent implements OnInit, OnDestroy {
    public imageBaseUrl = `${environment.UrlImages}`;
  trainers: UserModel[] = [];
  duplicatedTrainers: UserModel[] = [];
  currentPosition = 0;
  scrollSpeed = 1;
  isPaused = false;
  hoverPaused = false;
  animationFrameId: number = 0;
  lastTimestamp = 0;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadTrainers();
  }

  loadTrainers() {
    // Assuming 'TRAINER' is the role name for trainers in your system
    this.userService.getAllByRoleName('Coatch').subscribe({
      next: (trainers) => {
        this.trainers = trainers;
        this.duplicatedTrainers = [...this.trainers, ...this.trainers];
        this.startAutoScroll();
      },
      error: (err) => {
        console.error('Error loading trainers:', err);
        // Fallback to default trainers if API fails
        this.trainers = [
          {
            id: "1",
            userName: "Samanta",
            email: "",
            telephone: "",
            motDePasse: "",
            roleName: "TRAINER",
            description: "",
            profileImage: null,
            imageUrl: "assets/single-2.jpg"
          },
          {
            id: "2",
            userName: "Artur",
            email: "",
            telephone: "",
            motDePasse: "",
            roleName: "TRAINER",
            description: "",
            profileImage: null,
            imageUrl: "assets/single-2.jpg"
          }, {
            id: "1",
            userName: "Samanta",
            email: "",
            telephone: "",
            motDePasse: "",
            roleName: "TRAINER",
            description: "",
            profileImage: null,
            imageUrl: "assets/single-2.jpg"
          },
          {
            id: "2",
            userName: "Artur",
            email: "",
            telephone: "",
            motDePasse: "",
            roleName: "TRAINER",
            description: "",
            profileImage: null,
            imageUrl: "assets/single-2.jpg"
          },
        ];
        this.duplicatedTrainers = [...this.trainers, ...this.trainers];
        this.startAutoScroll();
      }
    });
  }

  ngOnDestroy() {
    this.stopAutoScroll();
  }

  startAutoScroll() {
    this.stopAutoScroll();
    const animate = (timestamp: number) => {
      if (!this.lastTimestamp) this.lastTimestamp = timestamp;
      const delta = timestamp - this.lastTimestamp;
      this.lastTimestamp = timestamp;

      if (!this.isPaused && !this.hoverPaused) {
        this.currentPosition += this.scrollSpeed * (delta / 16);
        if (this.currentPosition >= this.trainers.length * 300) {
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
    this.currentPosition += 300;
    if (this.currentPosition >= this.trainers.length * 300) {
      this.currentPosition = 0;
    }
  }

  prevSlide() {
    this.currentPosition -= 300;
    if (this.currentPosition < 0) {
      this.currentPosition = (this.trainers.length - 1) * 300;
    }
  }

  getTrainerName(trainer: UserModel): string {
    return trainer.userName.split(' ')[0] || trainer.userName;
  }

  getTrainerSurname(trainer: UserModel): string {
    const parts = trainer.userName.split(' ');
    return parts.length > 1 ? parts.slice(1).join(' ') : '';
  }
}
