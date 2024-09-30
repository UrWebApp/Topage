import type { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';

export const DemoResolver: ResolveFn<boolean> = (
  route: ActivatedRouteSnapshot, // 是當前路由的靜態快照。它包含了關於當前激活的路由（和它的父路由、子路由）的所有信息。這個快照表示的是路由導航發生當時的狀態，並且不會隨後的導航或參數改變而變化。
  state: RouterStateSnapshot // 表示應用在某一個時間點的完整路由狀態。它包含整個路由樹的靜態快照，也就是從根路由到當前激活路由的所有路由狀態。
) => {

  // const productId = route.params['name'];
  // const currentUrl = state.url;
  // return this.http.get(`https://xxx/${productId}`);

  return true;
};

// 搭配 Router 使用
import { Routes, RouterModule } from '@angular/router';
import { Component, NgModule } from '@angular/core';
// import { OneComponent } from './res-one.component';
// import { TwoComponent } from './res-two.component';
// import { HomeComponent } from './res-home.component';
// import { DemoResolver } from './demo-resolver.service';

const routes: Routes = [
  {
    path: '',
    // component: HomeComponent
  },
  {
    path: 'one/:name',
    // component: OneComponent,
    resolve: {
      dataNickName: DemoResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule {

}


// 如何取得回傳
@Component({
  selector: "app-hero",
  standalone: true,
  template: `
    <h1>Hellow Resolver</h1>
  `,
})
export class HeroComponent {

  constructor(
    // private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.activatedRoute.data.subscribe(({ dataNickName }) => {
    // do something with your resolved data ...
    // })
  }

}
