import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NewsLetterComponent } from '../news-letter/news-letter.component';

import { FooterComponent } from '../footer/footer.component';

import { AwardsService } from '../../cores/services/awards.service';
@Component({
  selector: 'app-artist',
  imports: [HeaderComponent, NewsLetterComponent, FooterComponent],
  templateUrl: './artist.component.html',
  styles: ``,
})
export class ArtistComponent {
  @Input() activeLink: string = '';

  nominees: any[] = [];
  errorMessage: string = '';

  constructor(private awardsService: AwardsService) { }

  ngOnInit(): void {
    this.loadNominees();
  }

  loadNominees(): void {
    this.awardsService.listNominees().subscribe({
      next: (data) => {
        this.nominees = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load artists';
        console.error(err);
      },
    });
  }
}
