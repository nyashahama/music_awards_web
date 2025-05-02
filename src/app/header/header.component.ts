import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent {
  @Input() activeLink: string = '';
}
