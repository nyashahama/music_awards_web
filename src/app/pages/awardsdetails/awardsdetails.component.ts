import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsLetterComponent } from '../news-letter/news-letter.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ArtistService } from '../../cores/services/artist.service';
import { CommonModule } from '@angular/common';
import { AwardsService } from '../../cores/services/awards.service';
import { NomineeService } from '../../cores/services/nominee.service';
import { VoteService } from '../../cores/services/vote.service';
import { AuthService } from '../../cores/services/auth.service';

@Component({
  selector: 'app-awardsdetails',
  standalone: true,
  imports: [
    CommonModule,
    NewsLetterComponent,
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './awardsdetails.component.html',
  styleUrl: './awardsdetails.component.css',
})
export class AwardsdetailsComponent {
 categoryId: string = '';
  category: any = null;
  nominees: any[] = [];
  loading = true;
  errorMessage: string = '';
  hasVoted = false;
  isLoggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private awardsService: AwardsService,
    private nomineeService: NomineeService,
    private voteService: VoteService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id') || '';
    this.isLoggedIn = this.authService.isLoggedIn();

    this.loadCategory();
    this.loadNominees();

    if (this.isLoggedIn) {
      this.checkVoteStatus();
    }
  }

  loadCategory(): void {
  // Use getCategory instead of getCategories
  this.awardsService.getCategory(this.categoryId).subscribe({
    next: (data) => {
      this.category = data;
    },
    error: (err) => {
      console.error(err);
      this.errorMessage = 'Failed to load category details';
    }
  });
}

loadNominees(): void {
  this.nomineeService.getNomineesByCategory(this.categoryId).subscribe({
    next: (data) => {
      // Map response to consistent structure
      this.nominees = data.map((nominee: any) => ({
        id: nominee.nominee_id,
        name: nominee.name,
        imageUrl: nominee.image_url
      }));
      this.loading = false;
    },
    error: (err) => {
      console.error(err);
      this.errorMessage = 'Failed to load nominees';
      this.loading = false;
    }
  });
}
  checkVoteStatus(): void {
    // Implement logic to check if user has voted in this category
    // This would typically call a backend endpoint
    this.hasVoted = false; // Placeholder
  }

  vote(nomineeId: string): void {
    if (!this.isLoggedIn) {
      this.errorMessage = 'Please log in to vote';
      return;
    }

    if (this.hasVoted) {
      this.errorMessage = 'You have already voted in this category';
      return;
    }

    this.voteService.castVote(this.categoryId, nomineeId).subscribe({
      next: () => {
        this.hasVoted = true;
        this.errorMessage = '';
        // Show success message
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to submit vote';
      }
    });
  }}
