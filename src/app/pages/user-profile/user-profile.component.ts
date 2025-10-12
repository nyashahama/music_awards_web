// user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../cores/services/auth.service';
import { VoteService, Vote } from '../../cores/services/vote.service'; // Add this import
import { Router } from '@angular/router';

interface UserProfile {
  user_id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  username: string;
  avatar?: string;
  timezone?: string;
  bio?: string;
  joinedDate?: Date;
  votingHistory?: VotingRecord[];
}

interface VotingRecord {
  id: string;
  awardName: string;
  category: string;
  nominee: string;
  year: number;
  date: Date;
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  activeTab: string = 'profile';
  profileForm: FormGroup;
  isLoading = false;
  showSuccessMessage = false;
  userId?: string;
  errorMessage = '';

  user: UserProfile = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    timezone: 'America/New_York',
    bio: '',
  };

  // Add voting history array
  votingHistory: VotingRecord[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private voteService: VoteService, // Inject the vote service
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      bio: [''],
      timezone: ['America/New_York']
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadVotingHistory(); // Load voting history when component initializes
  }

  loadUserProfile(): void {
    this.authService.getCurrentProfile().subscribe({
      next: (user: UserProfile) => {
        console.log('Received user data:', user);
        this.user = user;
        this.userId = user.user_id;
        if (!this.userId) {
          console.log('User Id not found in response');
          return;
        }
        this.profileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
          bio: user.bio,
          timezone: user.timezone,
        });
      },
      error: (err) => {
        console.error('Failed to load profile:', err);
      },
    });
  }

  // Add method to load voting history
  loadVotingHistory(): void {
    this.voteService.getUserVotes().subscribe({
      next: (votes: Vote[]) => {
        console.log('Received votes:', votes);
        // Transform the API response to match your VotingRecord interface
        this.votingHistory = votes.map(vote => ({
          id: vote.id,
          awardName: 'Zimdancehall Awards', // You might need to adjust this based on your data
          category: vote.category_name || 'Unknown Category',
          nominee: vote.nominee_name || 'Unknown Nominee',
          year: new Date(vote.created_at).getFullYear(),
          date: new Date(vote.created_at)
        }));

        // Also update the user object for the template
        this.user.votingHistory = this.votingHistory;
      },
      error: (err) => {
        console.error('Failed to load voting history:', err);
        this.errorMessage = 'Failed to load voting history';
      }
    });
  }

  updateProfile(): void {
    console.log('Submitting:', this.profileForm.value);
    console.log('User ID:', this.userId);
    if (this.profileForm.valid && this.userId) {
      this.isLoading = true;
      this.errorMessage = '';

      const updatedData = {
        firstName: this.profileForm.value.firstName,
        lastName: this.profileForm.value.lastName,
        username: this.profileForm.value.username,
        email: this.profileForm.value.email,
        bio: this.profileForm.value.bio,
        timezone: this.profileForm.value.timezone,
      };

      this.authService.updateUserProfile(this.userId, updatedData).subscribe({
        next: (updatedUser) => {
          this.user = { ...this.user, ...updatedUser };
          this.isLoading = false;
          this.showSuccessMessage = true;
          setTimeout(() => (this.showSuccessMessage = false), 3000);
        },
        error: (err) => {
          console.error('Update error:', err);
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Failed to update profile';
        },
      });
    } else {
      console.log('Form invalid or missing user ID');
      this.profileForm.markAllAsTouched();
    }
  }

  deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.') && this.userId) {
      this.authService.deleteUserProfile(this.userId).subscribe({
        next: () => {
          this.authService.logout();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Delete error:', err);
          this.errorMessage = err.error?.message || 'Account deletion failed';
        },
      });
    }
  }

  triggerFileInput(): void {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLElement;
    fileInput.click();
  }

  onAvatarChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.user.avatar = e.target.result as string;
          // Here you would typically upload the avatar to your server
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
