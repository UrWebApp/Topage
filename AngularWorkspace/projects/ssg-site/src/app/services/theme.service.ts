import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private _darkMode = new BehaviorSubject<boolean>(false);
  darkMode$ = this._darkMode.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initTheme();
  }

  private initTheme(): void {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme) {
      this.setTheme(storedTheme === 'dark');
    } else {
      this.setTheme(prefersDarkMode);
    }

    // Listen for changes in browser's preferred color scheme
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) { // Only auto-switch if no user preference is stored
        this.setTheme(e.matches);
      }
    });
  }
  toggleTheme(): void {
    const newMode = !this._darkMode.value;
    this.setTheme(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  }

  private setTheme(isDark: boolean): void {
    this._darkMode.next(isDark);
    if (isDark) {
      this.renderer.addClass(document.body, 'dark-mode');
      this.renderer.removeClass(document.body, 'light-mode');
    } else {
      this.renderer.addClass(document.body, 'light-mode');
      this.renderer.removeClass(document.body, 'dark-mode');
    }
  }

  isDarkMode(): boolean {
    return this._darkMode.value;
  }
}
