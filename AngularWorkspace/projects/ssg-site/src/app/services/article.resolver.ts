// projects/ssg-site/src/app/services/article.resolver.ts
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { parseMarkdownFile } from 'lib/feature/markdown-utils/markdown-utils';
import { map, catchError, of } from 'rxjs'; // 建議加入錯誤處理

export const articleResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const httpClient = inject(HttpClient);

  // 取得 URL 參數 (如果在子路由，可能需要查閱 parent)
  // 因為我們結構是 :lang -> children -> :category/:name
  // :lang 在 parent，:category/:name 在當前 route
  const lang = route.parent?.paramMap.get('lang') || 'zh-tw';
  const category = route.paramMap.get('category');
  const name = route.paramMap.get('name');

  // 路徑變成 content/{lang}/{category}/{name}.md
  const path = `content/${lang}/${category}/${name}.md`;

  return httpClient
    .get(path, { responseType: 'text' })
    .pipe(
      map(parseMarkdownFile),
      catchError(err => {
        console.error(`Markdown not found for ${lang}:`, err);
        // 可以考慮 fallback 回預設語言，或回傳 null 顯示 404
        return of(null);
      })
    );
};
