import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ArtistComponent } from './artist/artist.component';
import { AwardsComponent } from './awards/awards.component';
import { ContactComponent } from './contact/contact.component';
import { ErrorsComponent } from './errors/errors.component';
import { NomineesComponent } from './nominees/nominees.component';
import { PricingComponent } from './pricing/pricing.component';
import { StatsComponent } from './stats/stats.component';
import { TeamComponent } from './team/team.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

// Update your routes array
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'artist',
    loadComponent: () =>
      import('./artist/artist.component').then((m) => m.ArtistComponent),
  },
  { path: 'awards', component: AwardsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'nominees', component: NomineesComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'team', component: TeamComponent },
  { path: 'testimonials', component: TestimonialsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '404', component: ErrorsComponent },
  { path: '**', redirectTo: '/404' },
];
