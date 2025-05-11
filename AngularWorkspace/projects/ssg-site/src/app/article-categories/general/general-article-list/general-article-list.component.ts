import { Component, HostListener, inject, OnInit } from '@angular/core';
import { GeneralNavbarComponent } from 'projects/ssg-site/src/app/components/general-navbar/general-navbar.component';
import { GeneralHeroSectionComponent } from 'projects/ssg-site/src/app/components/general-hero-section/general-hero-section.component';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../../services/routeTxt.resolver';
import { CommonModule } from '@angular/common';
import { ArticleSummaryPipe } from "../../../services/article-summary.pipe";
import { RouterLink, RouterOutlet } from '@angular/router';
import { GeneralArticleCardComponent } from '../../../components/general-article-card/general-article-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-general-article-list',
  standalone: true,
  imports: [GeneralNavbarComponent, GeneralHeroSectionComponent,GeneralArticleCardComponent,CommonModule, ArticleSummaryPipe, RouterLink, RouterOutlet,FormsModule],
  templateUrl: './general-article-list.component.html',
  styleUrl: './general-article-list.component.scss'
})
export class GeneralArticleListComponent implements OnInit {
  ngOnInit(): void {
    this.rawArticlesInfo = this.activatedRoute.snapshot.data['articlesInfo'];
    console.log('Route Text:', this.rawArticlesInfo);

  }
  private activatedRoute = inject(ActivatedRoute);
  rawArticlesInfo: Article[] | any = [];
  visibleCount = 9;
  get visiblePosts() {
    return this.rawArticlesInfo.slice(0, this.visibleCount);
  }

  loadMore() {
    if (this.visibleCount < this.rawArticlesInfo.length) {
      this.visibleCount += 6;
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.body.offsetHeight;
    if (scrollPosition >= pageHeight - 100) {
      this.loadMore();
    }
  }
}
