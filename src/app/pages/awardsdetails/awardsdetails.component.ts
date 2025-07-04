import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NewsLetterComponent } from '../news-letter/news-letter.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ArtistService } from '../../cores/services/artist.service';
import { CommonModule } from '@angular/common';
import { AwardsService } from '../../cores/services/awards.service';
import { NomineeService } from '../../cores/services/nominee.service';
import { VoteService } from '../../cores/services/vote.service';
import { AuthService } from '../../cores/services/auth.service';
import { CategoryService } from '../../cores/services/category.service';

@Component({
  selector: 'app-awardsdetails',
  standalone: true,
  imports: [
    CommonModule,
    NewsLetterComponent,
    FooterComponent,
    HeaderComponent,
    RouterModule,
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
  isAdmin = false; // Add admin flag
  availableVotes: number = 0; // Initialize available votes
  completedCategories: number = 0; // Initialize completed categories
  totalCategories: number = 0; // Initialize total categories

  constructor(
    private route: ActivatedRoute,
    private awardsService: AwardsService,
    private nomineeService: NomineeService,
    private voteService: VoteService,
    private authService: AuthService,
    private router: Router,
    private categoryService: CategoryService, // Inject CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id') || '';
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.getCurrentUser() === 'admin';

    this.loadCategory();
    this.loadNominees();
    this.loadCategoriesCount(); // Load total categories

    if (this.isLoggedIn) {
      this.checkVoteStatus();
      this.loadAvailableVotes();
    }
  }

  private loadCategoriesCount(): void {
    this.categoryService.listActiveCategories().subscribe({
      next: (categories) => {
        this.totalCategories = categories.length;
      },
      error: (err) => {
        console.error('Failed to load categories count', err);
        this.totalCategories = 10; // Fallback value
      },
    });
  }

  private loadAvailableVotes(): void {
    this.voteService.getAvailableVotes().subscribe({
      next: (response) => {
        this.availableVotes = response.available_votes;
        // Update completed categories (total - available)
        this.completedCategories = this.totalCategories - this.availableVotes;
      },
      error: (err) => {
        console.error('Error loading available votes', err);
      },
    });
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
      },
    });
  }

  loadNominees(): void {
    this.nomineeService.getNomineesByCategory(this.categoryId).subscribe({
      next: (data) => {
        this.nominees = data.map((nominee: any) => ({
          id: nominee.id,
          name: nominee.name,
          imageUrl: nominee.image_url,
        }));
        console.log('Nominees loaded:', this.nominees); // Add this for debugging
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load nominees';
        this.loading = false;
      },
    });
  }
  checkVoteStatus(): void {
    // Implement logic to check if user has voted in this category
    // This would typically call a backend endpoint
    this.hasVoted = false; // Placeholder
  }

  vote(nomineeId: string): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url },
      });
      return;
    }

    if (this.hasVoted) {
      this.errorMessage = 'You have already voted in this category';
      return;
    }

    if (this.availableVotes <= 0) {
      this.errorMessage = 'You have no votes remaining';
      return;
    }

    // Validate UUID format
    if (!this.isValidUuid(this.categoryId)) {
      this.errorMessage = 'Invalid category ID format';
      return;
    }

    if (!this.isValidUuid(nomineeId)) {
      this.errorMessage = 'Invalid nominee ID format';
      return;
    }

    this.voteService.castVote(this.categoryId, nomineeId).subscribe({
      next: () => {
        this.hasVoted = true;
        this.availableVotes--;
        this.completedCategories++;
        this.errorMessage = '';
        alert('Vote submitted successfully!');
        this.loadAvailableVotes();
        this.checkVoteStatus();
      },
      error: (err) => {
        console.error('Vote error:', err);
        if (err.error?.error) {
          this.errorMessage = err.error.error;
        } else if (err.status === 400) {
          this.errorMessage = 'Invalid request. Please check your vote.';
        } else {
          this.errorMessage = err.message || 'Failed to submit vote';
        }
      },
    });
  }

  private isValidUuid(id: string): boolean {
    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidPattern.test(id);
  }

  private updateAvailableVotes(): void {
    this.voteService.getAvailableVotes().subscribe({
      next: (response) => {
        //todo:
        console.log('Available votes:', response.available_votes);
      },
    });
  }
}
