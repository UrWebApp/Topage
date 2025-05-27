import { Injectable, Renderer2, RendererFactory2, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common'; // 導入 isPlatformBrowser

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private _darkMode = new BehaviorSubject<boolean>(false);
  darkMode$ = this._darkMode.asObservable();

  // 注入 PLATFORM_ID
  constructor(
    rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: Object // 注入 PLATFORM_ID
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initTheme();
  }

  private initTheme(): void {
    // 只有在瀏覽器環境中才執行涉及 'window' 和 'localStorage' 的代碼
    if (isPlatformBrowser(this.platformId)) {
      const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const storedTheme = localStorage.getItem('theme');

      if (storedTheme) {
        this.setTheme(storedTheme === 'dark');
      } else {
        this.setTheme(prefersDarkMode);
      }

      // 監聽瀏覽器偏好設定的變化
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) { // 只有在沒有用戶偏好設定時才自動切換
          this.setTheme(e.matches);
        }
      });
    } else {
      // 在非瀏覽器環境（如 SSR）下，您可以設置一個默認主題
      // 例如，默認是亮色模式
      this._darkMode.next(false);
      // 或者在 SSR 環境下，您可以選擇不設置任何主題，等待瀏覽器端接管
    }
  }

  toggleTheme(): void {
    // 只有在瀏覽器環境中才允許切換主題和使用 localStorage
    if (isPlatformBrowser(this.platformId)) {
      const newMode = !this._darkMode.value;
      this.setTheme(newMode);
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
    } else {
      console.warn('Theme toggle is not available in non-browser environment.');
    }
  }

  private setTheme(isDark: boolean): void {
    this._darkMode.next(isDark);
    // 只有在瀏覽器環境中才操作 DOM (addClass/removeClass)
    if (isPlatformBrowser(this.platformId)) {
      if (isDark) {
        this.renderer.addClass(document.body, 'dark-mode');
        this.renderer.removeClass(document.body, 'light-mode');
      } else {
        this.renderer.addClass(document.body, 'light-mode');
        this.renderer.removeClass(document.body, 'dark-mode');
      }
    }
  }

  isDarkMode(): boolean {
    return this._darkMode.value;
  }
}
