import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'articleSummary',
  standalone: true
})

// 有需要的話再改成 async pipe
export class ArticleSummaryPipe implements PipeTransform {

  transform(value: string, limit: number = 100): string {
    if (!value) return '';

    // 移除 img 標籤，並用 [圖片] 取代（如果需要）
    let plainText = value.replace(/<img[^>]*>/g, ''); // 或改成 ''

    // 移除所有其他 HTML 標籤
    plainText = plainText.replace(/<[^>]+>/g, '');

    // 截取前 limit 個字，並加上 "..."
    return plainText.length > limit ? plainText.substring(0, limit) + '...' : plainText;
  }

}
