import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vote-confirmation',
  imports: [],
  templateUrl: './vote-confirmation.component.html',
  styles: ``,
})
export class VoteConfirmationComponent {
  categoryName: string = '';
  nomineeName: string = '';
  nomineeImage: string = '';

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.categoryName = params['category'] || 'this category';
      this.nomineeName = params['nominee'] || 'your artist';
      this.nomineeImage = params['image'] || 'assets/placeholder-artist.jpg';
    });
  }
}
