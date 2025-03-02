import { routes } from './../../../../spa-site/src/app/app.routes';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { forkJoin, lastValueFrom, map, tap } from 'rxjs';
import { MarkdownData, parseMarkdownFile } from 'lib/feature/markdown-utils/markdown-utils';

export interface Article {
  route: string,
  markdownData: MarkdownData
}



export const routeTxtResolver: ResolveFn<any> = async (
  { paramMap }: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const httpClient = inject(HttpClient);

  try {
    // 讀取 routes.txt
    const rawRoutes = await lastValueFrom(httpClient.get(`assets/routes.txt`, { responseType: 'text' }).pipe(
      tap(data => console.log('Raw File Content:', data)),
      map(data =>
        data
          .trim()
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.split('/').filter(Boolean).length >= 2) // 過濾只有一個斜線的 URL
      )
    ));

    console.log('Processed Routes:', rawRoutes);

    // 取得所有對應的 Markdown 檔案內容
    const articles = await lastValueFrom(
      forkJoin(
        rawRoutes.map(route =>
          httpClient.get(`content${route}.md`, { responseType: 'text' }).pipe(
            map(parseMarkdownFile),
            map(markdownData => ({ route, markdownData }))
          )
        )
      )
    );

    console.log('Final Article Data:', articles);
    return articles;
  } catch (error) {
    console.error('Error resolving routes:', error);
    return [];
  }
};
