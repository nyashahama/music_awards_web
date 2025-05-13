import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NewsLetterComponent } from '../news-letter/news-letter.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-awards',
  imports: [HeaderComponent, NewsLetterComponent, FooterComponent],
  templateUrl: './awards.component.html',
  styles: ``,
})
export class AwardsComponent {
  @Input() activeLink: string = '';
}
