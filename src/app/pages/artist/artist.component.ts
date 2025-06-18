import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//import { ArtistService, Nominee } from './artist.service';
import { Subscription } from 'rxjs';
import { ArtistService, Nominee } from '../../cores/services/artist.service';
import { HeaderComponent } from '../header/header.component';
import { NewsLetterComponent } from '../news-letter/news-letter.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, NewsLetterComponent, FooterComponent],
  templateUrl: './artist.component.html',
})
export class ArtistComponent implements OnInit, OnDestroy {
  nominees: Nominee[] = [];
  errorMessage: string = '';
  loading: boolean = true;
  private subscription: Subscription = new Subscription();

  constructor(private artistService: ArtistService) {}

  ngOnInit(): void {
    this.loadNominees();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadNominees(): void {
    this.loading = true;
    this.errorMessage = '';

    const sub = this.artistService.listAllNominees().subscribe({
      next: (data: Nominee[]) => {
        this.nominees = data;
        this.loading = false;
        console.log('Nominees loaded:', data); // Debug log
      },
      error: (error) => {
        console.error('Error loading nominees:', error);
        this.errorMessage = 'Failed to load artists. Please try again later.';
        this.loading = false;
      }
    });

    this.subscription.add(sub);
  }

  onImageError(event: any): void {
    console.log('Image failed to load:', event.target.src); // Debug log
    event.target.src = '/assets/placeholder-artist.png';
  }

  // Helper method to get a safe image URL
  getSafeImageUrl(imageUrl: string | null | undefined): string {
    if (!imageUrl) {
      return '/assets/placeholder-artist.png';
    }

    // Check if it's a relative URL and make it absolute
    if (imageUrl.startsWith('/') && !imageUrl.startsWith('//')) {
      return `https://music-awards-api.onrender.com${imageUrl}`;
    }

    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }

    // If it's a relative path without leading slash
    return `https://music-awards-api.onrender.com/${imageUrl}`;
  }
}
