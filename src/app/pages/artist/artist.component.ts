import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NewsLetterComponent } from '../news-letter/news-letter.component';

import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-artist',
  imports: [HeaderComponent, NewsLetterComponent, FooterComponent],
  templateUrl: './artist.component.html',
  styles: ``,
})
export class ArtistComponent {
  @Input() activeLink: string = '';
}
