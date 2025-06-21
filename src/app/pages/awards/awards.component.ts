import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NewsLetterComponent } from '../news-letter/news-letter.component';
import { FooterComponent } from '../footer/footer.component';
import { AwardsService } from '../../cores/services/awards.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-awards',
  imports: [HeaderComponent, NewsLetterComponent, FooterComponent],
  templateUrl: './awards.component.html',
  styles: ``,
})
export class AwardsComponent implements OnInit {
  @Input() activeLink: string = '';

  categories: any[] = [];
  errorMessage: string = '';

  constructor(private awardsService: AwardsService,private router: Router) { }

  ngOnInit(): void {
  this.awardsService.listCategories().subscribe({
    next: (data) => {
      console.log(data);
      this.categories = data;
    },
    error: (err) => {
      this.errorMessage = 'Failed to load categories';
      console.log(err);
    },
  })
}

}
