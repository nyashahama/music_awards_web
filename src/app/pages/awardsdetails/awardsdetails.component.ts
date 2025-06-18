import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsLetterComponent } from '../news-letter/news-letter.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ArtistService } from '../../cores/services/artist.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-awardsdetails',
  standalone: true,
  imports: [
    CommonModule,
    NewsLetterComponent,
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './awardsdetails.component.html',
  styleUrl: './awardsdetails.component.css',
})
export class AwardsdetailsComponent {
  nominee: any = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.artistService.getNomineeDetails(id).subscribe({
        next: (data) => {
          this.nominee = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load artist details';
          this.loading = false;
          console.error('Error loading artist:', err);
        },
      });
    } else {
      this.error = 'Invalid artist ID';
      this.loading = false;
    }
  }
}
