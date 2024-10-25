import { Routes } from '@angular/router';
import { articleResolver } from './article/article.resolver';
import { ArticleComponent } from './article/article.component';

export const routes: Routes = [
  {
    path: ':category/:name',
    component: ArticleComponent,
    resolve: {
      article: articleResolver,
    },
  }
];
