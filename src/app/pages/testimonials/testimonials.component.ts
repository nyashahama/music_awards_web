import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  image: string;
  votes: number;
  artists: number;
  years: number;
  verified: boolean;
}

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styles: ``
})
export class TestimonialsComponent {
  currentTestimonial = 0;

  testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "Being able to vote for my favorite Zimdancehall artists has been amazing! The extra votes feature really let me show support for the talent that represents our music and culture. So happy to see these awards giving recognition to our artists.",
      name: "Tendai Makoni",
      role: "Dedicated Zimdancehall Fan",
      image: "/api/placeholder/256/256",
      votes: 150,
      artists: 25,
      years: 2,
      verified: true
    },
    {
      id: 2,
      quote: "The Zimdancehall Awards platform is incredible! The voting process is smooth, and I love how I can support multiple artists across different categories. This is exactly what our music scene needed.",
      name: "Sarah Chidodo",
      role: "Music Enthusiast",
      image: "/api/placeholder/256/256",
      votes: 89,
      artists: 15,
      years: 1,
      verified: true
    },
    {
      id: 3,
      quote: "As a longtime fan of Zimdancehall, seeing this level of organization and recognition for our artists brings me so much joy. The extra votes system is fair and really lets superfans show their support.",
      name: "James Moyo",
      role: "Zimdancehall Supporter",
      image: "/api/placeholder/256/256",
      votes: 210,
      artists: 32,
      years: 3,
      verified: true
    }
  ];

  nextTestimonial(): void {
    this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
  }

  previousTestimonial(): void {
    this.currentTestimonial = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
  }

  goToTestimonial(index: number): void {
    this.currentTestimonial = index;
  }

  get currentTestimonialData(): Testimonial {
    return this.testimonials[this.currentTestimonial];
  }
}
