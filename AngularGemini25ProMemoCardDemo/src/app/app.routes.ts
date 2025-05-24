import { Routes } from '@angular/router';
import { DrawCardComponent } from './features/draw-card/draw-card.component';
import { ListCardsComponent } from './features/list-cards/list-cards.component';
// EditCardComponent 通常通過 Modal 打開，不一定需要獨立路由
// import { EditCardComponent } from './features/edit-card/edit-card.component';

export const routes: Routes = [
  { path: 'draw', component: DrawCardComponent },
  { path: 'list', component: ListCardsComponent },
  // { path: 'edit/:id', component: EditCardComponent }, // 如果 EditCard 是頁面
  // { path: 'new', component: EditCardComponent },     // 如果 EditCard 是頁面
  { path: '', redirectTo: '/draw', pathMatch: 'full' },
  { path: '**', redirectTo: '/draw' } // 兜底路由
];
