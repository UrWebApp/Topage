import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Article } from '../../services/routeTxt.resolver';

@Component({
  selector: 'app-article-card',
  standalone: true,
  // 移除 ArticleSummaryPipe，因為摘要已經在 JSON 中預先算好了
  imports: [CommonModule, RouterModule],
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  // 使用 required: true 確保 article 一定會被傳入 (Angular 16+)
  @Input({ required: true }) article!: Article;

  // 移除了 meta getter、formattedDate 和 getFirstImageSrc
  // 1. meta getter: 直接在 HTML 用 article.markdownData.meta 即可
  // 2. formattedDate: HTML 中已經使用 date pipe
  // 3. getFirstImageSrc: 圖片網址已在 build 時提取至 article.markdownData.coverImage
}
