import { Routes } from '@angular/router';
import { articleResolver } from './article-categories/general/article.resolver';
import { ArticleComponent } from './article-categories/general/article.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
