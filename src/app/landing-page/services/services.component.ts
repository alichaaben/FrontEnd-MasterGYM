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
      title: 'body bulding',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
    },
    {
      icon: 'assets/serv-2.svg',
      title: 'group workouts',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
    },
    {
      icon: 'assets/serv-3.svg',
      title: 'boxing',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
    }
  ];

  clubCards = [
    {
      price: '40',
      cents: '99',
      duration: '3 months',
      features: [
        { text: 'Maecenas consequat', excluded: false },
        { text: 'ex id lobortis venenatis', excluded: false },
        { text: 'Mauris id erat enim', excluded: false },
        { text: 'Morbi dolor dolortin', excluded: true },
        { text: 'lorem ut, venenatis dapibus mi', excluded: true }
      ]
    },
    {
      price: '70',
      cents: '99',
      duration: '6 months',
      features: [
        { text: 'Maecenas consequat', excluded: false },
        { text: 'ex id lobortis venenatis', excluded: false },
        { text: 'Mauris id erat enim', excluded: false },
        { text: 'Morbi dolor dolortin', excluded: false },
        { text: 'lorem ut, venenatis dapibus mi', excluded: true }
      ]
    },
    {
      price: '120',
      cents: '99',
      duration: '1 year',
      features: [
        { text: 'Maecenas consequat', excluded: false },
        { text: 'ex id lobortis venenatis', excluded: false },
        { text: 'Mauris id erat enim', excluded: false },
        { text: 'Morbi dolor dolortin', excluded: false },
        { text: 'lorem ut, venenatis dapibus mi', excluded: false }
      ]
    }
  ];
}