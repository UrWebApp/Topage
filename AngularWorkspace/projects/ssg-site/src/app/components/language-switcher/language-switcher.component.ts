import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateService, Language } from 'lib/feature/translate/translate.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss'
})
export class LanguageSwitcherComponent {
  private translateService = inject(TranslateService);
  private router = inject(Router);

  languages: Language[] = this.translateService.availableLanguages;
  currentLang$ = this.translateService.currentLang$;

  switchLanguage(targetLang: string) {
    const currentUrl = this.router.url;
    // 解析當前網址結構
    const urlTree = this.router.parseUrl(currentUrl);

    // 取得主要路徑片段 (Segments)
    // 例如 /zh-tw/list/article-1 => segments: ['zh-tw', 'list', 'article-1']
    const segments = urlTree.root.children['primary'] ? urlTree.root.children['primary'].segments : [];

    if (segments.length > 0) {
      // 直接替換第一個路徑片段 (即語言代碼)
      segments[0].path = targetLang;

      // 重新導向
      this.router.navigateByUrl(urlTree);
    } else {
      // 預防萬一是在根路徑 (雖然 routes config 通常會 redirect)
      this.router.navigate([targetLang]);
    }
  }
}
