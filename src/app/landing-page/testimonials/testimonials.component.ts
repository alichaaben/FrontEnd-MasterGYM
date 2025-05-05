import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent {
  testimonialsTop = [
    {
      quote: "Working with Samuel was a game-changer! His Tailwind CSS skills brought our UI to life with a clean, modern, and fully responsive design.",
      name: "Sarah M",
      role: "Startup Founder",
      image: "https://images.unsplash.com/photo-1665686307516-?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxmZW1hbGV8ZW58MHwwfHx8MTc0MzU5Njc5OXww&ixlib=rb-4.0.3&q=80&w=1080"
    },
    {
      quote: "Finding a great Laravel developer is tough, but Samuel exceeded all my expectations. His code is clean, efficient, and highly scalable.",
      name: "Daniel S",
      role: "Business Owner",
      image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHxwZXJzb258ZW58MHwwfHx8MTc0MzMyNzEzNHww&ixlib=rb-4.0.3&q=80&w=1080"
    },
    {
      quote: "A rare talent who excels in Tailwind, Nuxt.js, and Laravel! He built a full-stack web app that is both powerful and beautiful.",
      name: "John M",
      role: "Startup CEO",
      image: "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwyfHxwZXJzb258ZW58MHwwfHx8MTc0MzMyNzEzNHww&ixlib=rb-4.0.3&q=80&w=1080"
    },
    {
      quote: "I struggled with bloated CSS files until Samuel revamped our frontend using Tailwind. The result? A lightweight, maintainable, and stunning interface!",
      name: "James L",
      role: "Frontend Engineer",
      image: "https://images.unsplash.com/photo-1473830394358-91588751b241?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxwZXJzb258ZW58MHwwfHx8MTc0MzMyNzEzNHww&ixlib=rb-4.0.3&q=80&w=1080"
    },
    {
      quote: "I can't recommend Samuel enough! He transformed our Vue.js project into a high-performance Nuxt.js app with seamless API integration.",
      name: "Laura P",
      role: "Marketing Manager",
      image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxM3x8cGVyc29ufGVufDB8MHx8fDE3NDMzMjcxMzR8MA&ixlib=rb-4.0.3&q=80&w=1080"
    },
    {
      quote: "If you're looking for a top-tier Laravel developer, look no further. Samuel delivers quality code and always meets deadlines.",
      name: "Lisa T",
      role: "Tech Founder",
      image: "https://images.unsplash.com/photo-1665686308827-eb62e4f6604d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMXx8d29tYW58ZW58MHwwfHx8MTc0MzM5ODE0N3ww&ixlib=rb-4.0.3&q=80&w=1080"
    },
    {
      quote: "Thanks to Samuel, our Nuxt.js app now loads in a fraction of the time and ranks higher on search engines!",
      name: "Kevin H",
      role: "Digital Marketer",
      image: "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMHx8bWVufGVufDB8MHx8fDE3NDMzOTgxOTd8MA&ixlib=rb-4.0.3&q=80&w=1080"
    }
  ];

  testimonialsBottom = [
    {
      quote: "Nuxt.js can be tricky, but Samuel made everything look effortless. From state management to routing, they nailed it.",
      name: "Marry J.",
      role: "Startup Founder",
      image: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxwZXJzb258ZW58MHwwfHx8MTc0MzU5NTUxMXww&ixlib=rb-4.0.3&q=80&w=1080"
    },
    {
      quote: "The Laravel API Samuel built for us was robust, secure, and well-documented. Our mobile app team loved working with it!",
      name: "Jason K.",
      role: "Mobile App Developer",
      image: "https://images.unsplash.com/photo-1500048993953-d23a436266cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw3fHxwZXJzb258ZW58MHwwfHx8MTc0MzU5NTUxMXww&ixlib=rb-4.0.3&q=80&w=1080"
    },
    {
      quote: "We had a messy PHP codebase, and Samuel expertly migrated it to Laravel. The new system is modern, scalable, and easy to maintain.",
      name: "Mark E.",
      role: "Software Architect",
      image: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxtZW58ZW58MHwwfHx8MTc0MzU5NTk5Nnww&ixlib=rb-4.0.3&q=80&w=1080"
    },
    {
      quote: "The way Samuel implements Tailwind is incredible. Our website now looks amazing and performs better than ever!",
      name: "David T.",
      role: "E-commerce Manager",
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMXx8bWVufGVufDB8MHx8fDE3NDM1OTU5OTZ8MA&ixlib=rb-4.0.3&q=80&w=1080"
    },
    {
      quote: "A complete package! Samuel crafted a sleek UI with Tailwind, built a high-performance Nuxt.js frontend, and powered it with a rock-solid Laravel backend.",
      name: "Steve J.",
      role: "Project Manager",
      image: "https://images.unsplash.com/photo-1559893088-c0787ebfc084?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxtZW58ZW58MHwwfHx8MTc0MzU5NTk5Nnww&ixlib=rb-4.0.3&q=80&w=1080"
    },
    {
      quote: "From the frontend to the backend, Samuel handled everything flawlessly. Their attention to detail and problem-solving skills are unmatched.",
      name: "Ethan F.",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1442328166075-47fe7153c128?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxtZW58ZW58MHwwfHx8MTc0MzU5NTk5Nnww&ixlib=rb-4.0.3&q=80&w=1080"
    },
    {
      quote: "Our team was new to Tailwind, but Samuel guided us through the transition effortlessly, making our development process faster and more efficient.",
      name: "Melissa K.",
      role: "SaaS Founder",
      image: "https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMHx8cHJvZ3JhbW1lcnxlbnwwfDB8fHwxNzQzNTk2NDUxfDA&ixlib=rb-4.0.3&q=80&w=1080"
    }
  ];
}
