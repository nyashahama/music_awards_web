import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NewsLetterComponent } from '../news-letter/news-letter.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-nominees',
  imports: [HeaderComponent, NewsLetterComponent, FooterComponent],
  templateUrl: './nominees.component.html',
  styles: ``,
})
export class NomineesComponent {

}
