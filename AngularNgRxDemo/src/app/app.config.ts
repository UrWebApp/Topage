import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { userFeature } from './store/user/reducer/user.reducer';
import { UserEffects } from './store/user/effects/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [ // 啟用註冊功能
    provideZoneChangeDetection({ eventCoalescing: true }), // Zone.js 變更偵測，同步事件合併（coalesce）成一次偵測循環，減少重繪
    provideRouter(routes), // 路由
    provideHttpClient(), // http 在應用中透過 DI 直接注入執行
    provideStore(), // 全域 Root store
    provideState(userFeature), // Register user feature
    provideEffects([UserEffects]), // Register effects
  ]
};
