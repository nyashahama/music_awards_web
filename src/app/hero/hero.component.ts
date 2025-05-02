import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-hero',
  imports: [HeaderComponent],
  templateUrl: './hero.component.html',
  styles: ``,
})
export class HeroComponent {
  @Input() activeLink: string = '';
}
