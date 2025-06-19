import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'articleSummary',
  standalone: true
})

// 有需要的話再改成 async pipe
export class ArticleSummaryPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(content: string | null | undefined, limit: number = 200): SafeHtml {
    if (!content) return '';

    let snippet = content.substring(0, limit);
    const imgRegExp = /<img[^>]*?>/i;
    const imgMatch = snippet.match(imgRegExp);
    let imgTag = '';
  if (imgMatch) {
    const originalImgTag = imgMatch[0];

    // 檢查是否已經有 class
    if (/class\s*=/.test(originalImgTag)) {
      // append class
      imgTag = originalImgTag.replace(
        /class\s*=\s*(['"])([^'"]*)\1/,
        `class=$1$2 article-card-img`
      );
    } else {
      // 插入 class（盡可能插入在 <img 之後）
      imgTag = originalImgTag.replace(
        /<img/,
        `<img class="article-card-img"`
      );
    }
  }

    const textOnly = this.stripHtml(snippet.replace(imgRegExp, ''));

    const result = textOnly + '...';
    return this.sanitizer.bypassSecurityTrustHtml(result);
  }

  private stripHtml(html: string): string {
    // 簡易版：移除所有 HTML tag
    return html.replace(/<[^>]*>/g, '');
  }

}
