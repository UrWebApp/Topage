import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
  },
  {
    path: 'article',
    loadChildren: () => import('./article/article.routes'),
  }
];
