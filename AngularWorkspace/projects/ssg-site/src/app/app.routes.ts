import { Routes } from '@angular/router';
import { GeneralArticleListComponent } from './article-categories/general/general-article-list/general-article-list.component';
import { HomeComponent } from './pages/home/home.component';
import { ArticleComponent } from './article-categories/general/general-article/article.component';
import { articleResolver } from './article-categories/general/general-article/article.resolver';
import { routeTxtResolver } from './services/routeTxt.resolver';
import { ArticleListComponent } from './pages/article-list/article-list.component';

export const routes: Routes = [
  {
    path: 'test',
    component: GeneralArticleListComponent,
    resolve: {
      articlesInfo: routeTxtResolver,
    }
  },
  {
    path: '',
    component: HomeComponent,
  },
   {
    path: 'list',
    component: ArticleListComponent,
  },
  {
    path: ':category/:name',
    component: ArticleComponent,
    resolve: {
      article: articleResolver,
    }
  }
];
