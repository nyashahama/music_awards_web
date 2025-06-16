import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AwardsService } from '../../cores/services/awards.service';
import { NewsLetterComponent } from '../news-letter/news-letter.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-awardsdetails',
  imports: [NewsLetterComponent, FooterComponent, HeaderComponent],
  templateUrl: './awardsdetails.component.html',
  styleUrl: './awardsdetails.component.css',
})
export class AwardsdetailsComponent {
  nominee: any = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private awardsService: AwardsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.awardsService.getNomineeDetails(id).subscribe({
        next: (data) => {
          this.nominee = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load artist details';
          this.loading = false;
          console.error(err);
        },
      });
    }
  }
}
