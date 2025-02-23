import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { parseMarkdownFile } from 'lib/feature/markdown-utils/markdown-utils';
import { map, tap } from 'rxjs';

export const markdownResolver: ResolveFn<any> = (
  { paramMap }: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const httpClient = inject(HttpClient);
  const category = paramMap.get('category');
  const name = paramMap.get('name');
  let routeTxt = httpClient
    .get(`assets/routes.txt`, { responseType: 'text' })
    .pipe(
      tap((res) => console.log(res)),
      map(parseMarkdownFile)
    );
  return routeTxt;
};
