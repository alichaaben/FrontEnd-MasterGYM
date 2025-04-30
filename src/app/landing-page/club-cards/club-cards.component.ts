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
      description: "Maecenas consequat ex id lobortis venenatis. Mauris id erat enim. Morbi dolor dolortin lorem ut.",
      note: "Payment on the GYM",
    },
    {
      id: 2,
      price: 320,
      duration: "6 months",
      description: "Maecenas consequat ex id lobortis venenatis. Mauris id erat enim. Morbi dolor dolortin lorem ut.",
      note: "Payment on the GYM",
    },
    {
      id: 3,
      price: 360,
      duration: "12 months",
      description: "Maecenas consequat ex id lobortis venenatis. Mauris id erat enim. Morbi dolor dolortin lorem ut.",
      note: "Payment on the GYM",
    }
  ];

}
