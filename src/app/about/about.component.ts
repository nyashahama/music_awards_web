import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-about',
  imports: [HeaderComponent],
  templateUrl: './about.component.html',
  styles: ``,
})
export class AboutComponent {
  @Input() activeLink: string = '';
}
