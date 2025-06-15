import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'diffHighlight',
  standalone: true
})
export class DiffHighlightPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, compareString: string): SafeHtml {
    if (value === null || value === undefined || compareString === null || compareString === undefined) {
      // 如果任一字串為 null 或 undefined，直接回傳原始值 (或空字串)
      // 這裡我們回傳空字串以避免 innerHTML 綁定錯誤
      return this.sanitizer.bypassSecurityTrustHtml(value || '');
    }

    let resultHtml = '';
    const valueLength = value.length;
    const compareLength = compareString.length;
    const maxLength = Math.max(valueLength, compareLength); // 我們只關心 value 中的差異

    for (let i = 0; i < valueLength; i++) {
      const charValue = value[i];
      const charCompare = compareString[i]; // 可能 undefined 如果 compareString 較短

      if (charValue !== charCompare) {
        // 不相符或 compareString 在此索引無字符
        resultHtml += `<span style="color: red;">${this.escapeHtml(charValue)}</span>`;
      } else {
        resultHtml += this.escapeHtml(charValue);
      }
    }

    // 注意：此 pipe 只會處理並回傳與 value 等長的結果。
    // 如果 compareString 比 value 長，多餘的部分不會被考慮。
    // 如果 value 比 compareString 長，value 多餘的部分會被標紅。

    return this.sanitizer.bypassSecurityTrustHtml(resultHtml);
  }

  // 輔助函式，用於轉義 HTML 特殊字符，以防 XSS 風險（雖然在此情境下風險較低）
  private escapeHtml(unsafe: string): string {
    if (!unsafe) return '';
    return unsafe
         .replace(/&/g, "&")
         .replace(/</g, "<")
         .replace(/>/g, ">")
         .replace(/"/g, "\"")
         .replace(/'/g, "'");
  }
}
