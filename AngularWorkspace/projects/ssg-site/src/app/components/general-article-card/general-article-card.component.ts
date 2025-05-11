import { Component, Input } from '@angular/core';
import { ArticleSummaryPipe } from '../../services/article-summary.pipe';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Article } from '../../services/routeTxt.resolver';

@Component({
  selector: 'app-general-article-card',
  standalone: true,
  imports: [ ArticleSummaryPipe,RouterLink, RouterOutlet,CommonModule],
  templateUrl: './general-article-card.component.html',
  styleUrl: './general-article-card.component.scss'
})
export class GeneralArticleCardComponent {

  @Input() articleCardData!: Article;

}
