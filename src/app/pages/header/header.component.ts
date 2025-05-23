import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Route, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../cores/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent implements OnInit, OnDestroy{
  @Input() activeLink: string = '';

  isLoggedIn = false;
  username: string | null = null;
  private userSub!: Subscription;

  userAvatar?: string;
  isProfileDropdownOpen = false;
  isMobileMenuOpen = false;


  constructor(public authService: AuthService,private router: Router){}

  ngOnInit(): void {
  console.log('Header init - initial auth state:', this.authService.getToken());
      this.userSub = this.authService.currentUser$.subscribe(user =>{
        this.username = user;
        this.isLoggedIn = !!user;
    });
  }

  toggleProfileDropdown(): void {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  closeProfileDropdown(): void {
    this.isProfileDropdownOpen = false;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }


  logout(): void{
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
      this.userSub?.unsubscribe();
  }

}
