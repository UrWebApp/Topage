import { Component, Input } from '@angular/core';
import { ArticleSummaryPipe } from '../../services/article-summary.pipe';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Article } from '../../services/routeTxt.resolver';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [ArticleSummaryPipe,RouterLink, RouterOutlet,CommonModule],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent {
  @Input() article!: Article;

  get meta() {
    return this.article.markdownData?.meta;
  }

  get formattedDate(): string {
    const date = this.meta?.date ? new Date(this.meta.date) : null;
    return date ? date.toLocaleDateString() : '';
  }
}
