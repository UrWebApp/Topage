import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';

// External and local dependencies
import { MarkdownData } from 'lib/feature/markdown-utils/markdown-utils';
import { HeaderComponent } from '../../components/header/header.component';


@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    // Angular Core Modules
    CommonModule,
    RouterLink,
    DatePipe,
    TitleCasePipe,
    HeaderComponent
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ArticleComponent {
  private activatedRoute = inject(ActivatedRoute);

  /**
   * Signal that holds the resolved article data from the route.
   */
  protected markdownData = toSignal(
    this.activatedRoute.data.pipe(
      map((data: any) => data['article'] as MarkdownData)
    )
  );

  /**
   * Signal that holds the category from the URL parameters for breadcrumbs.
   */
  protected category = toSignal(
    this.activatedRoute.paramMap.pipe(map((params) => params.get('category')))
  );

  constructor() {
    // Component initialization logic can go here.
  }
}
