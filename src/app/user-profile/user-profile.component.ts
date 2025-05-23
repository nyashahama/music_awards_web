import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

interface UserProfile {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  avatar?: string;
  timezone: string;
  bio?: string;
  joinedDate?: Date;
  votingHistory?: VotingRecord[];
}

interface VotingRecord {
  awardName: string;
  category: string;
  nominee: string;
  year: number;
  date: Date;
}

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

  activeTab: string = 'profile';
  profileForm: FormGroup;
  isLoading = false;
  showSuccessMessage = false;

  user: UserProfile = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    timezone: 'America/New_York',
    bio: 'Passionate Zimdancehall music lover and supporter of local artists.',
    joinedDate: new Date('2023-01-15'),
    votingHistory: [
      {
        awardName: 'Best Zimdancehall Artist 2024',
        category: 'Artist of the Year',
        nominee: 'Winky D',
        year: 2024,
        date: new Date('2024-03-15')
      },
      {
        awardName: 'Best Zimdancehall Song 2024',
        category: 'Song of the Year',
        nominee: 'Kanjiva - Tocky Vibes',
        year: 2024,
        date: new Date('2024-03-20')
      }
    ]
  };

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: [this.user.firstName, [Validators.required, Validators.minLength(2)]],
      lastName: [this.user.lastName, [Validators.required, Validators.minLength(2)]],
      email: [this.user.email, [Validators.required, Validators.email]],
      username: [this.user.username, [Validators.required, Validators.minLength(3)]],
      bio: [this.user.bio],
      timezone: [this.user.timezone, Validators.required]
    });
  }

  ngOnInit(): void {
    // In a real app, you would load user data from a service
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    // Simulate API call
    // this.userService.getCurrentUser().subscribe(user => {
    //   this.user = user;
    //   this.profileForm.patchValue(user);
    // });
  }

  updateProfile(): void {
    if (this.profileForm.valid) {
      this.isLoading = true;

      // Simulate API call
      setTimeout(() => {
        this.user = { ...this.user, ...this.profileForm.value };
        this.isLoading = false;
        this.showSuccessMessage = true;

        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
      }, 1500);
    }
  }

  triggerFileInput(): void {
    const fileInput = document.querySelector('input[type="file"]') as HTMLElement;
    fileInput.click();
  }

  onAvatarChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

}
