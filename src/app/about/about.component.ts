import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NewsLetterComponent } from '../news-letter/news-letter.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-about',
  imports: [HeaderComponent, NewsLetterComponent, FooterComponent],
  templateUrl: './about.component.html',
  styles: ``,
})
export class AboutComponent {
  @Input() activeLink: string = '';
}
