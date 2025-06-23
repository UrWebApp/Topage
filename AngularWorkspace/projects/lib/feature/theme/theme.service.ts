// src/app/theme.service.ts

import { Injectable, OnDestroy, RendererFactory2, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // <--- 1. 引入 isPlatformBrowser
import { BehaviorSubject, Subscription } from 'rxjs';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService implements OnDestroy {
  private renderer: Renderer2;
  private themeSubscription: Subscription;

  public theme$ = new BehaviorSubject<Theme>(Theme.Light);

  // 2. 在 constructor 注入 PLATFORM_ID
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initializeTheme();

    // 訂閱主題變化
    this.themeSubscription = this.theme$.subscribe(theme => {
      // 3. 防護 document 和 localStorage 的操作
      if (isPlatformBrowser(this.platformId)) {
        if (theme === Theme.Dark) {
          this.renderer.addClass(document.documentElement, 'dark');
        } else {
          this.renderer.removeClass(document.documentElement, 'dark');
        }
        // 只有在瀏覽器環境才寫入 localStorage
        localStorage.setItem('theme', theme);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
        this.themeSubscription.unsubscribe();
    }
  }

  // 初始化主題
  private initializeTheme(): void {
    // 4. 防護整個初始化邏輯
    if (isPlatformBrowser(this.platformId)) {
      const storedTheme = localStorage.getItem('theme') as Theme;
      if (storedTheme) {
        this.theme$.next(storedTheme);
        return; // 如果從 localStorage 讀到值，就直接返回
      }

      // 檢查用戶系統偏好
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme$.next(prefersDark ? Theme.Dark : Theme.Light);
    } else {
      // 在伺服器端，我們無法知道用戶的偏好，所以給一個預設值（例如 'light'）
      // 這不會影響最終用戶體驗，因為一旦程式碼在瀏覽器中執行，上面的邏輯會再次運行並修正主題。
      this.theme$.next(Theme.Light);
    }
  }

  // toggleTheme 方法不需要修改，因為它只操作 BehaviorSubject，不涉及瀏覽器 API
  public toggleTheme(): void {
    const currentTheme = this.theme$.getValue();
    const newTheme = currentTheme === Theme.Light ? Theme.Dark : Theme.Light;
    this.theme$.next(newTheme);
  }
}
