import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NewsLetterComponent } from '../news-letter/news-letter.component';
import { FooterComponent } from '../footer/footer.component';
import { AwardsService } from '../../cores/services/awards.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-awards',
  imports: [HeaderComponent, NewsLetterComponent, FooterComponent, RouterModule],
  templateUrl: './awards.component.html',
  styles: ``,
})
export class AwardsComponent implements OnInit {
  @Input() activeLink: string = '';
  categories: any[] = [];
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private awardsService: AwardsService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.awardsService.listCategories().subscribe({
      next: (data) => {
        console.log(data);
        this.categories = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load categories';
        this.loading = false;
        console.log(err);
      },
    });
  }
}
