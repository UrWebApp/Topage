import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { parseMarkdownFile } from 'lib/feature/markdown-utils/markdown-utils';
import { map, tap } from 'rxjs';

export const articleResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const category = route.paramMap.get('category');
  const name = route.paramMap.get('name');

  console.log(category);
  console.log(name);
  console.log(route);
  console.log(state);

  const httpClient = inject(HttpClient);
  return httpClient
    .get(`content/${category}/${name}.md`, { responseType: 'text' })
    .pipe(
      tap(() => console.log('start get markdown')),
      map((content) =>
        console.log('parsed markdown:', parseMarkdownFile(content))
      )
    );
};
