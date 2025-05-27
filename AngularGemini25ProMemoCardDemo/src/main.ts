import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { ApplicationConfig, importProvidersFrom } from '@angular/core'; // importProvidersFrom 如果需要從傳統模組提供
// import { provideRouter } from '@angular/router'; // 如果未來有路由
// import { provideHttpClient } from '@angular/common/http'; // 如果使用 HttpClient

// 如果你的服務不是 providedIn: 'root'，或者有其他模組需要提供 (例如 i18n)
// 你可以在這裡配置
// import { FlashcardService } from './app/services/flashcard.service';
// import { TtsService } from './app/services/tts.service';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment'; // 引入環境變數

export const appConfig: ApplicationConfig = {
  providers: [
    // provideRouter([]), // 範例: 啟用路由
    // provideHttpClient(), // 範例: 啟用 HttpClient
    // FlashcardService, // 如果沒有 providedIn: 'root'
    // TtsService,       // 如果沒有 providedIn: 'root'
    provideFirebaseApp(() => initializeApp(environment.firebase)), // 初始化 Firebase App
    provideAuth(() => getAuth()),                                 // 提供 Auth 服務
    provideFirestore(() => getFirestore())                         // 提供 Firestore 服務
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
