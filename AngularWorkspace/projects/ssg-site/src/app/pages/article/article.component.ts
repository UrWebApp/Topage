import { OutlineLink } from './../../components/outline-sidebar/outline-sidebar.component';
import { ChangeDetectorRef, Component, ElementRef, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';

// External and local dependencies
import { MarkdownData } from 'lib/feature/markdown-utils/markdown-utils';
import { HeaderComponent } from '../../components/header/header.component';
import { OutlineSidebarComponent } from '../../components/outline-sidebar/outline-sidebar.component';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    // Angular Core Modules
    CommonModule,
    RouterLink,
    DatePipe,
    TitleCasePipe,
    HeaderComponent,
    OutlineSidebarComponent
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ArticleComponent {
  private activatedRoute = inject(ActivatedRoute);
  public outlineLinks: OutlineLink[] = []; // 4. 新增屬性來儲存大綱連結
  private elementRef = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);

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
  private createOutline(): void {
    const headings: HTMLElement[] =
      this.elementRef.nativeElement.querySelectorAll(
        '.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6'
      );
    const links: OutlineLink[] = [];

    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.substring(1), 10);
      const text = heading.innerText;
      // 簡單地用文字內容產生 ID，移除特殊字元
      const id = text
        .trim()
        .toLowerCase()
        .replace(/[\s\W-]+/g, '-');

      heading.id = id; // 直接在 DOM 元素上設定 ID
      links.push({ level, text, id });
    });

    this.outlineLinks = links;
    // 因為 ngAfterViewInit 後的變動可能不會被偵測，手動觸發變更檢測
    this.cdr.detectChanges();
  }
  constructor() {
    // Component initialization logic can go here.
  }
}
