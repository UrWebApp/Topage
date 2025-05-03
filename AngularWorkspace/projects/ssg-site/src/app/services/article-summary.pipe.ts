import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'articleSummary',
  standalone: true
})

// 有需要的話再改成 async pipe
export class ArticleSummaryPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(content: string, limit: number = 200): SafeHtml {
    if (!content) return '';

    let snippet = content.substring(0, limit);
    const imgRegExp = /<img[^>]*?>/i;
    const imgMatch = snippet.match(imgRegExp);
    const imgTag = imgMatch ? imgMatch[0] : '';
    const textOnly = this.stripHtml(snippet.replace(imgRegExp, ''));

    const result = textOnly + imgTag + '...';
    return this.sanitizer.bypassSecurityTrustHtml(result);
  }

  private stripHtml(html: string): string {
    // 簡易版：移除所有 HTML tag
    return html.replace(/<[^>]*>/g, '');
  }

}
