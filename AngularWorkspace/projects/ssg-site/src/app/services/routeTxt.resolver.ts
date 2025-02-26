import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { map, tap } from 'rxjs';

export const routeTxtResolver: ResolveFn<any> = (
  { paramMap }: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const httpClient = inject(HttpClient);
  let routeArray = httpClient.get(`assets/routes.txt`, { responseType: 'text' }).pipe(
    tap((res) => console.log('Raw File Content:', res)), // 確保有拿到檔案內容
    map((res) => {
      let routes = res
      .trim()
      .split('\n')
      .map(line=> line.trim())
      return routes;
    })
  );

  return routeArray;
};
