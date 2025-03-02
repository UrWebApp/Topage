import { Routes } from '@angular/router';
import { GeneralArticleListComponent } from './article-categories/general/general-article-list/general-article-list.component';
import { HomeComponent } from './pages/home/home.component';
import { ArticleComponent } from './article-categories/general/general-article/article.component';
import { articleResolver } from './article-categories/general/general-article/article.resolver';
import { routeTxtResolver } from './services/routeTxt.resolver';

export const routes: Routes = [
  {
    path: '',
    component: GeneralArticleListComponent,
    resolve: {
      articlesInfo: routeTxtResolver,
    }
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: ':category/:name',
    component: ArticleComponent,
    resolve: {
      article: articleResolver,
    }
  }
];
