import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './pages/hero/hero.component';
import { NewsLetterComponent } from './pages/news-letter/news-letter.component';
import { FooterComponent } from './pages/footer/footer.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';
import { AwardsComponent } from './pages/awards/awards.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeroComponent,
    NewsLetterComponent,
    FooterComponent,
    PricingComponent,
    TestimonialsComponent,
    AwardsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-tour-of-heroes';
}
