import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap, catchError, of } from 'rxjs';

export interface Language {
  code: string;
  label: string;
}

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private http = inject(HttpClient);
  private translations: any = {};

  // ✅ 1. 定義預設語言 (Default Fallback)
  readonly DEFAULT_LANG = 'en';

  // ✅ 2. 初始化時使用預設語言
  currentLang$ = new BehaviorSubject<string>(this.DEFAULT_LANG);

  availableLanguages: Language[] = [
    { code: 'zh-tw', label: '繁體中文' },
    { code: 'en', label: 'English' },
    { code: 'jp', label: '日本語' },   // ✅ 新增日文
  ];

  // ✅ 3. 新增檢查方法：語言是否支援？
  isLangSupported(langCode: string): boolean {
    return this.availableLanguages.some(l => l.code === langCode);
  }

  loadTranslations(lang: string) {
    // 如果傳進來的 lang 不支援，就強制用預設語言
    const targetLang = this.isLangSupported(lang) ? lang : this.DEFAULT_LANG;

    return this.http.get(`/assets/i18n/${targetLang}.json`).pipe(
      tap((data) => {
        this.translations = data;
        this.currentLang$.next(targetLang); // 更新當前語言
      }),
      catchError(err => {
        console.error(`Translation error, falling back to ${this.DEFAULT_LANG}`, err);
        // 如果連這個檔案都抓不到，嘗試抓預設語言 (避免死循環，這裡做簡單處理)
        return of({});
      })
    );
  }

  public Instant(key: string): string {
    return key.split('.').reduce((obj, k) => obj && obj[k], this.translations) || key;
  }
}
