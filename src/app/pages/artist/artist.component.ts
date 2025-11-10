import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArtistService, Nominee } from '../../cores/services/artist.service';
import { HeaderComponent } from '../header/header.component';
import { NewsLetterComponent } from '../news-letter/news-letter.component';
import { FooterComponent } from '../footer/footer.component';
import { NomineeService } from '../../cores/services/nominee.service';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    NewsLetterComponent,
    FooterComponent,
    RouterLink,
  ],
  templateUrl: './artist.component.html',
  styles: [`
    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-20px);
      }
    }

    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-float {
      animation: float 6s ease-in-out infinite;
    }

    .animate-fade-in {
      animation: fade-in 0.6s ease-out forwards;
    }

    :host ::ng-deep article {
      animation: fade-in 0.6s ease-out forwards;
      opacity: 0;
    }
  `],
})
export class ArtistComponent implements OnInit, OnDestroy {
  nominees: Nominee[] = [];
  errorMessage: string = '';
  loading: boolean = true;
  private subscription: Subscription = new Subscription();

  constructor(private nomineeService: NomineeService) { }

  ngOnInit(): void {
    this.loadNominees();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadNominees(): void {
    this.loading = true;
    this.errorMessage = '';

    const sub = this.nomineeService.getAllNominees().subscribe({
      next: (data: Nominee[]) => {
        this.nominees = data;
        this.loading = false;
        console.log('Nominees loaded:', data);
      },
      error: (error) => {
        console.error('Error loading nominees:', error);
        this.errorMessage = 'Failed to load artists. Please try again later.';
        this.loading = false;
      },
    });

    this.subscription.add(sub);
  }

  onImageError(event: any): void {
    console.log('Image failed to load:', event.target.src);

    if (event.target.src.includes('images.app.goo.gl')) {
      event.target.src = '/assets/placeholder-artist.png';
    } else {
      event.target.src = '/assets/placeholder-artist.png';
    }
  }

  getSafeImageUrl(imageUrl: string | null | undefined): string {
    if (!imageUrl) {
      return '/assets/placeholder-artist.png';
    }

    if (imageUrl.includes('images.app.goo.gl')) {
      return '/assets/placeholder-artist.png';
    }

    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }

    const baseUrl = 'https://music-awards-api.onrender.com';
    return imageUrl.startsWith('/')
      ? `${baseUrl}${imageUrl}`
      : `${baseUrl}/${imageUrl}`;
  }
}
