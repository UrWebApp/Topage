import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { parseMarkdownFile } from 'lib/feature/markdown-utils/markdown-utils';
import { map, tap } from 'rxjs';

export const articleResolver: ResolveFn<any> = (
  { paramMap }: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const httpClient = inject(HttpClient);
  const category = paramMap.get('category');
  const name = paramMap.get('name');
  return httpClient
    .get(`content/${category}/${name}.md`, { responseType: 'text' })
    .pipe(
      // tap(() => console.log(`Fetching markdown file: category=${category}, name=${name}`)),
      map(parseMarkdownFile)
    );
};
