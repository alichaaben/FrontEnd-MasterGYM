import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  services = [
    {
      icon: 'assets/serv-1.svg',
      title: 'Bodybuilding',
      description: 'Build strength and muscle mass with our specialized bodybuilding programs. From weight training to proper nutrition, we guide you every step of the way.'
    },
    {
      icon: 'assets/serv-2.svg',
      title: 'Group Workouts',
      description: 'Join our group workouts to stay motivated and push your limits. Whether it’s HIIT, circuit training, or fun challenges, there’s something for everyone.'
    },
    {
      icon: 'assets/serv-3.svg',
      title: 'Boxing',
      description: 'Learn the art of boxing with our expert trainers. Improve your strength, endurance, and coordination while having a great time in the ring.'
    }
  ];

  clubCards = [
    {
      price: '40',
      cents: '99',
      duration: '3 months',
      features: [
        { text: 'Access to all gym equipment', excluded: false },
        { text: 'Weekly personal training sessions', excluded: false },
        { text: 'Free group workout classes', excluded: false },
        { text: 'Nutrition consultation', excluded: true },
        { text: 'Exclusive workshops and events', excluded: true }
      ]
    },
    {
      price: '70',
      cents: '99',
      duration: '6 months',
      features: [
        { text: 'Access to all gym equipment', excluded: false },
        { text: 'Weekly personal training sessions', excluded: false },
        { text: 'Free group workout classes', excluded: false },
        { text: 'Nutrition consultation', excluded: false },
        { text: 'Exclusive workshops and events', excluded: true }
      ]
    },
    {
      price: '120',
      cents: '99',
      duration: '1 year',
      features: [
        { text: 'Access to all gym equipment', excluded: false },
        { text: 'Weekly personal training sessions', excluded: false },
        { text: 'Free group workout classes', excluded: false },
        { text: 'Nutrition consultation', excluded: false },
        { text: 'Exclusive workshops and events', excluded: false }
      ]
    }
  ];

}
