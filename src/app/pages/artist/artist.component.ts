import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../pages/header/header.component';
import { NewsLetterComponent } from '../pages/news-letter/news-letter.component';

import { FooterComponent } from '../pages/footer/footer.component';

@Component({
  selector: 'app-artist',
  imports: [HeaderComponent, NewsLetterComponent, FooterComponent],
  templateUrl: './artist.component.html',
  styles: ``,
})
export class ArtistComponent {
  @Input() activeLink: string = '';
}
