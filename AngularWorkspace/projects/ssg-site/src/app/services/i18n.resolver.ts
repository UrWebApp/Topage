import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TranslateService } from 'lib/feature/translate/translate.service';
import { EMPTY } from 'rxjs'; // 用來中斷原本的路由

export const i18nResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot // ✅ 加入 state 以取得完整 URL
) => {
  const translateService = inject(TranslateService);
  const router = inject(Router);

  // 取得 URL 中的語言參數
  const langParam = route.paramMap.get('lang');

  // ✅ 檢查：如果語言參數存在，但不在支援列表中
  if (langParam && !translateService.isLangSupported(langParam)) {

    // 取得預設語言 ('en')
    const fallbackLang = translateService.DEFAULT_LANG;

    // 將錯誤的語言替換成預設語言
    // 例如: /jp/about -> /en/about
    const newUrl = state.url.replace(`/${langParam}`, `/${fallbackLang}`);

    // 執行導向
    router.navigateByUrl(newUrl);

    // 回傳 EMPTY Observable，告訴 Router 取消原本的載入 (避免錯誤頁面閃爍)
    return EMPTY;
  }

  // 如果語言支援，或者沒有語言參數(會 fallback)，則正常載入
  const targetLang = langParam || translateService.DEFAULT_LANG;
  return translateService.loadTranslations(targetLang);
};
