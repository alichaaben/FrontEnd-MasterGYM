import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

// Card data interface
interface ClubCard {
  id: number;
  price: number;
  duration: string;
  description: string;
  note: string;
}

@Component({
  selector: 'app-club-cards',
  templateUrl: './club-cards.component.html',
  styleUrls: ['./club-cards.component.css']
})
export class ClubCardsComponent {


// Card data
clubCards: ClubCard[] = [
  {
    id: 1,
    price: 220,
    duration: "3 months",
    description: "Perfect for kickstarting your fitness journey with short-term commitment and full access to all equipment.",
    note: "Payment at the gym",
  },
  {
    id: 2,
    price: 320,
    duration: "6 months",
    description: "Stay consistent and motivated with six months of unlimited training and professional support.",
    note: "Payment at the gym",
  },
  {
    id: 3,
    price: 360,
    duration: "12 months",
    description: "Our best value plan — enjoy year-round access, progress tracking, and exclusive member perks.",
    note: "Payment at the gym",
  }
];
}
