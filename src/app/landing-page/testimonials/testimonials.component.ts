import { Component } from '@angular/core';
import { ContactMessage } from '../../model/contact-message.model';
import { ContactMessageService } from '../../services/contact-message.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent {

  messages: ContactMessage[] = [];

  constructor(private messageService: ContactMessageService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.messageService.getMessagesByStatus("APPROVED").subscribe({
      next: (messages) => {
        this.messages = messages;
      },
      error: (err) => {
        console.error('Error loading messages:', err);
      }
    });
  }
  //   {
  //     text: "As a seasoned designer always on the lookout for innovative tools, Framer.com instantly grabbed my attention.",
  //     imageSrc: "assets/avatar-1.png",
  //     name: "Jamie Rivera",
  //     username: "@jamietechguru00",
  //   },
  //   {
  //     text: "Our team's productivity has skyrocketed since we started using this tool. ",
  //     imageSrc: "assets/avatar-2.png",
  //     name: "Josh Smith",
  //     username: "@jjsmith",
  //   },
  //   {
  //     text: "This app has completely transformed how I manage my projects and deadlines.",
  //     imageSrc: "assets/avatar-3.png",
  //     name: "Morgan Lee",
  //     username: "@morganleewhiz",
  //   },
  //   {
  //     text: "I was amazed at how quickly we were able to integrate this app into our workflow.",
  //     imageSrc: "assets/avatar-4.png",
  //     name: "Casey Jordan",
  //     username: "@caseyj",
  //   },
  //   {
  //     text: "Planning and executing events has never been easier. This app helps me keep track of all the moving parts, ensuring nothing slips through the cracks.",
  //     imageSrc: "assets/avatar-5.png",
  //     name: "Taylor Kim",
  //     username: "@taylorkimm",
  //   },
  //   {
  //     text: "The customizability and integration capabilities of this app are top-notch.",
  //     imageSrc: "assets/avatar-6.png",
  //     name: "Riley Smith",
  //     username: "@rileysmith1",
  //   },
  //   {
  //     text: "Adopting this app for our team has streamlined our project management and improved communication across the board.",
  //     imageSrc: "assets/avatar-7.png",
  //     name: "Jordan Patels",
  //     username: "@jpatelsdesign",
  //   },
  //   {
  //     text: "With this app, we can easily assign tasks, track progress, and manage documents all in one place.",
  //     imageSrc: "assets/avatar-8.png",
  //     name: "Sam Dawson",
  //     username: "@dawsontechtips",
  //   },
  //   {
  //     text: "Its user-friendly interface and robust features support our diverse needs.",
  //     imageSrc: "assets/avatar-9.png",
  //     name: "Casey Harper",
  //     username: "@casey09",
  //   },
  // ];

  firstColumn = this.messages.slice(0, 3);
  secondColumn = this.messages.slice(3, 6);
  thirdColumn = this.messages.slice(6, 9);
}
