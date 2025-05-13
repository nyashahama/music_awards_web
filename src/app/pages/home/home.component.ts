import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { PricingComponent } from '../pricing/pricing.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { NewsLetterComponent } from '../news-letter/news-letter.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    PricingComponent,
    TestimonialsComponent,
    NewsLetterComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styles: ``,
})
export class HomeComponent {}
