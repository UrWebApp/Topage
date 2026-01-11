import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { articleResolver } from './services/article.resolver';
import { routeTxtResolver } from './services/routeTxt.resolver';
import { ArticleListComponent } from './pages/article-list/article-list.component';
import { ArticleComponent } from './pages/article/article.component';
import { SystemServicePageComponent } from './pages/system-service-page/system-service-page.component';

export const routes: Routes = [
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
    path: ':category/:name',
    component: ArticleComponent,
    resolve: {
      article: articleResolver,
    }
  }
];
