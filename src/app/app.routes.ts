import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';

import { AwardsComponent } from './pages/awards/awards.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ErrorsComponent } from './pages/errors/errors.component';
import { NomineesComponent } from './pages/nominees/nominees.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { StatsComponent } from './pages/stats/stats.component';
import { TeamComponent } from './pages/team/team.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ArtistComponent } from './pages/artist/artist.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AwardsdetailsComponent } from './pages/awardsdetails/awardsdetails.component';
import { VoteConfirmationComponent } from './pages/vote-confirmation/vote-confirmation.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },

  {
    path: 'artist',
    component: ArtistComponent,
  },
  { path: 'awards', component: AwardsComponent },
  { path: 'awards/:id', component: AwardsdetailsComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'nominees', component: NomineesComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'team', component: TeamComponent },
  { path: 'testimonials', component: TestimonialsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'vote-confirmation', component: VoteConfirmationComponent },
  { path: '404', component: ErrorsComponent },
  { path: '**', redirectTo: '/404' },
];
