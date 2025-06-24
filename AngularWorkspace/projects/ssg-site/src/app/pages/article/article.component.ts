import { Component, computed, inject, Signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// External and local dependencies
import { MarkdownData } from 'lib/feature/markdown-utils/markdown-utils';
import { HeaderComponent } from '../../components/header/header.component';
import { OutlineLink, OutlineSidebarComponent } from '../../components/outline-sidebar/outline-sidebar.component';

// Note: I've removed ViewEncapsulation.None and the direct .scss import.
// For [innerHTML] styles, it's better to use global styles (e.g., in styles.scss)
// targeting the .prose class, which you are already using.

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    CommonModule, RouterLink, DatePipe, TitleCasePipe,
    HeaderComponent, OutlineSidebarComponent
  ],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'], // Prefer global styles for .prose
})
export class ArticleComponent {
  private activatedRoute = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  // Raw data from the route resolver
  private markdownData = toSignal(
    this.activatedRoute.data.pipe(
      map((data) => data['article'] as MarkdownData)
    )
  );

  // A computed signal that processes the content once and returns both
  // the sanitized HTML with injected IDs and the outline links.
  private processedContent = computed(() => {
    const content = this.markdownData()?.content;
    if (!content) {
      return { html: null, links: [] };
    }
    return this.processHtmlAndExtractHeadings(content);
  });

  // Public signal for the template to bind the HTML content
  protected contentWithIds: Signal<SafeHtml | null> = computed(() => this.processedContent().html);

  // Public signal for the template to pass to the sidebar
  protected outline: Signal<OutlineLink[]> = computed(() => this.processedContent().links);

  protected category = toSignal(
    this.activatedRoute.paramMap.pipe(map((params) => params.get('category')))
  );

  private processHtmlAndExtractHeadings(htmlContent: string): { html: SafeHtml, links: OutlineLink[] } {
    const outlineLinks: OutlineLink[] = [];

    // Cannot run this on the server, so we return the original content.
    if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
      return {
        html: this.sanitizer.bypassSecurityTrustHtml(htmlContent),
        links: []
      };
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const headings = doc.querySelectorAll('h1, h2, h3'); // Limiting to h1-h3 for clarity

    headings.forEach((heading, index) => {
      const text = heading.textContent?.trim();
      if (!text) return;

      // Ensure every heading has an ID. If not, create one.
      let id = heading.id;
      if (!id) {
        id = this.slugify(text) + `-${index}`;
        heading.id = id; // *** THIS IS THE CRITICAL FIX ***
      }

      outlineLinks.push({
        level: parseInt(heading.tagName.substring(1), 10),
        text: text,
        id: id,
      });
    });

    // Return the MODIFIED HTML string (with new IDs) and the links
    const modifiedHtml = doc.body.innerHTML;
    return {
      html: this.sanitizer.bypassSecurityTrustHtml(modifiedHtml),
      links: outlineLinks
    };
  }

  private slugify(text: string): string {
    return text.toString().toLowerCase().trim()
      .replace(/\s+/g, '-')       // Replace spaces with -
      .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
      .replace(/\-\-+/g, '-');    // Replace multiple - with single -
  }
}
