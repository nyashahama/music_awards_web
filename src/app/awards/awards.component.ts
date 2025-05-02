import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-awards',
  imports: [HeaderComponent],
  templateUrl: './awards.component.html',
  styles: ``,
})
export class AwardsComponent {
  @Input() activeLink: string = '';
}
