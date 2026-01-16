import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { articleResolver } from './services/article.resolver';
import { routeTxtResolver } from './services/routeTxt.resolver';
import { ArticleListComponent } from './pages/article-list/article-list.component';
import { ArticleComponent } from './pages/article/article.component';
import { SystemServicePageComponent } from './pages/system-service-page/system-service-page.component';
import { ResumeComponent } from './pages/resume/resume.component';
import { i18nResolver } from './services/i18n.resolver';

export const routes: Routes = [
 {
    path: '',
    redirectTo: 'zh-tw',
    pathMatch: 'full'
  },
  // 帶有語言參數的路由
  {
    path: ':lang',
    resolve: {
      i18n: i18nResolver // ✅ 在進入任何子頁面面，先載入翻譯
    },
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'list',
        component: ArticleListComponent,
        resolve: {
          articlesInfo: routeTxtResolver,
        }
      },
      {
        path: 'syservice',
        component: SystemServicePageComponent,
      },
      {
        path: 'resume',
        component: ResumeComponent,
      },
      {
        path: ':category/:name',
        component: ArticleComponent,
        resolve: {
          article: articleResolver,
        }
      }
    ]
  }
];
