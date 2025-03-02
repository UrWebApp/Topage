import { Component, inject, OnInit } from '@angular/core';
import { GeneralNavbarComponent } from 'projects/ssg-site/src/app/components/general-navbar/general-navbar.component';
import { GeneralHeroSectionComponent } from 'projects/ssg-site/src/app/components/general-hero-section/general-hero-section.component';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../../services/routeTxt.resolver';
import { CommonModule } from '@angular/common';
import { ArticleSummaryPipe } from "../../../services/article-summary.pipe";

@Component({
  selector: 'app-general-article-list',
  standalone: true,
  imports: [GeneralNavbarComponent, GeneralHeroSectionComponent, CommonModule, ArticleSummaryPipe],
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
}
