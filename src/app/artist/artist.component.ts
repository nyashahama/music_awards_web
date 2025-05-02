import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-artist',
  imports: [],
  templateUrl: './artist.component.html',
  styles: ``,
})
export class ArtistComponent {
  @Input() activeLink: string = '';
}
