import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NomineeService } from '../../cores/services/nominee.service';
import { HeaderComponent } from '../header/header.component';
import { NewsLetterComponent } from '../news-letter/news-letter.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-artist-details',
  imports: [
    HeaderComponent,
    NewsLetterComponent,
    FooterComponent,
    RouterModule,
  ],
  templateUrl: './artist-details.component.html',
  styles: ``,
})
export class ArtistDetailsComponent {
  artistId: string = '';
  artist: any = null;
  loading = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private nomineeService: NomineeService,
  ) {}

  ngOnInit() {
    this.artistId = this.route.snapshot.paramMap.get('id') || '';
    this.loadArtist();
  }

  loadArtist(): void {
    this.nomineeService.getNomineeDetails(this.artistId).subscribe({
      next: (data) => {
        this.artist = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load artist deatils';
        this.loading = false;
      },
    });
  }
}
