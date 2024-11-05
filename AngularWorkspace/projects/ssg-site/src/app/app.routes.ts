import { Routes } from '@angular/router';
import { articleResolver } from './article-categories/general/general-article/article.resolver';
import { ArticleComponent } from './article-categories/general/general-article/article.component';
import { HomeComponent } from './pages/home/home.component';
import { GeneralArticleListComponent } from './article-categories/general/general-article-list/general-article-list.component';

export const routes: Routes = [
  {
    path: '',
    component: GeneralArticleListComponent,
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
