import { routes } from './../../../../spa-site/src/app/app.routes';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { map, tap } from 'rxjs';
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
  const articleData: Article[] = [];

  let routeArray: string[] = [];
  await httpClient.get(`assets/routes.txt`, { responseType: 'text' }).subscribe({
    next: data => {
      console.log(data);
      routeArray = data
        .trim()
        .split('\n')
        .map(line => line.trim())
        .filter((line) => line.split('/').filter(Boolean).length >= 2);
        console.log('in subscribe',routeArray);routeArray.forEach(route => {
          httpClient
            .get(`content${route}.md`, { responseType: 'text' })
            .pipe(
              map(parseMarkdownFile)
            ).subscribe({
              next: data => {
                articleData.push({
                  route: route, markdownData: {
                    meta: data!.meta,
                    content: data!.content
                  }
                });
              },
              error: error => {
                console.error('get article failed', error);
              }
            });
        });
    },
    error: error => {
      console.error('get routes failed', error);
    }
  });
  console.log('out subscribe',routeArray);
    console.log('articleData:',articleData);
    return routeArray;
  };
