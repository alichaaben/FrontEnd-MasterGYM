import { Component } from '@angular/core';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent {

  programs = [
    {
      id: 1,
      title: "Personal trainer",
      image: 'assets/programs-1.jpg',
      link: "#",
    },
    {
      id: 2,
      title: "Free workout",
      image: 'assets/programs-2.jpg',
      link: "#",
    },
    {
      id: 3,
      title: "CrossFit",
      image: 'assets/programs-3.jpg',
      link: "#",
    },
    {
      id: 4,
      title: "Martial Arts",
      image: 'assets/programs-4.jpg',
      link: "#",
    }
  ];
}
