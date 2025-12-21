import { HttpClient } from '@angular/common/http';
import { inject, makeStateKey, TransferState, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { lastValueFrom, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Article {
  route: string;
  markdownData: {
    meta: {
      title?: string;
      date?: string;
      category?: string;
      // ★ [UPDATED] 明確定義 author 與 tags
      author?: string;
      tags?: string[];
      [key: string]: any;
    };
    summary?: string;
    coverImage?: string | null;
    body?: string;
  };
}

const ARTICLES_LIST_KEY = makeStateKey<Article[]>('articlesListJson');

export const routeTxtResolver: ResolveFn<Article[]> = async (
  { paramMap }: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const httpClient = inject(HttpClient);
  const platformId = inject(PLATFORM_ID);
  const transferState = inject(TransferState);

  // 1. 客戶端檢查 (Hydration)
  if (isPlatformBrowser(platformId) && transferState.hasKey(ARTICLES_LIST_KEY)) {
    console.log('CLIENT: 命中 TransferState 快取');
    const articles = transferState.get(ARTICLES_LIST_KEY, []);
    transferState.remove(ARTICLES_LIST_KEY);
    return articles;
  }

  // 2. 請求資料
  console.log(isPlatformServer(platformId) ? 'SERVER: (SSG) 請求 JSON...' : 'CLIENT: (SPA) 請求 JSON...');

  try {
    const articles = await lastValueFrom(
      httpClient.get<Article[]>('assets/articles-list.json').pipe(
        tap(data => {
            // 3. 伺服器儲存
            if (isPlatformServer(platformId)) {
                transferState.set(ARTICLES_LIST_KEY, data);
            }
        }),
        catchError(err => {
            console.error('無法讀取 assets/articles-list.json', err);
            return of([]);
        })
      )
    );

    return articles;

  } catch (error) {
    console.error('Resolver 錯誤:', error);
    return [];
  }
};
