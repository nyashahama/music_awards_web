import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [HeaderComponent, RouterModule],
  templateUrl: './hero.component.html',
  styles: ``,
})
export class HeroComponent {
  @Input() activeLink: string = '';
}
