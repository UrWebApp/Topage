import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { provideHttpClient, withFetch } from '@angular/common/http';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // 啟用區域變更檢測，並且設定事件合併，這樣可以優化變更檢測的性能。
    provideRouter(routes), // 設定應用的路由，routes 是一個定義了應用路由的物件，將這些路由提供給 Angular 的路由系統。
    provideClientHydration(), // 啟用客戶端水合，這樣可以在客戶端加載時從伺服器渲染的內容中恢復 Angular 應用的狀態。

    provideHttpClient(withFetch()),

    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideFirestore(() => getFirestore()),
    // provideAuth(() => getAuth()),
  ]
};

// 客戶端水合（Client Hydration） 是指在客戶端環境中，將伺服器端渲染的 HTML 與 Angular 應用程序的元件和狀態進行同步的過程。
// 這一過程使得應用可以從伺服器獲取的靜態內容中恢復為動態的、可互動的狀態。
// 這樣一來，使用者在客戶端看到的內容能夠立刻變得可操作，而無需再次請求伺服器以獲取同樣的內容。這種技術能提升首次加載速度和 SEO 表現。
