import { Component, inject } from '@angular/core';
import { GeneralNavbarComponent } from 'projects/ssg-site/src/app/components/general-navbar/general-navbar.component';
import { GeneralHeroSectionComponent } from 'projects/ssg-site/src/app/components/general-hero-section/general-hero-section.component';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MarkdownData } from 'lib/feature/markdown-utils/markdown-utils';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-general-article-list',
  standalone: true,
  imports: [GeneralNavbarComponent, GeneralHeroSectionComponent],
  templateUrl: './general-article-list.component.html',
  styleUrl: './general-article-list.component.scss'
})
export class GeneralArticleListComponent {
private activatedRoute = inject(ActivatedRoute);
  private markdownData$ = this.activatedRoute.data.pipe(
    map((data: any) => data['markdown'] as MarkdownData),
  );
  protected markdownData = toSignal(this.markdownData$);
}
