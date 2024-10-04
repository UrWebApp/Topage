# Angular WorkSpace

## SSG SITE

our main blog, because of the seo, we use angular universal to build a SSG Site.

### STEP

1. 目前 AG CLI 非常方便 Libraries WorkSpace SSG 在 CLI 選項中點點設定就搞定了
2. init monorepo workspace`ng new my-monorepo --create-application=false`
3. generate a project in Monorepo `ng generate application my-ssg-app`
4. add Angular Universal `ng add @nguniversal/express-engine --project=my-ssg-app` or enable it when use cli generate app in step2.

> 通過這些步驟，你就可以在 Angular 原生的 Monorepo 中創建並運行一個 SSG 項目了。

5. Because we only need prerender feature but not SSR, so we have to disable SSR Option

```json
"scripts": [],
"browser": "src/main.ts",
"server": "src/main.server.ts",
"prerender": true, // 依賴 Ag 自動預渲染應用中的所有靜態路由，比對不到時可能會讓渲染卡住。
// "prerender": {
//   "routesFile": "routes.txt"
// },
"ssr": false,
// "ssr": {
//   "entry": "projects/ssg-site/server.ts"
// }
"define": {
    "isDevMode": "true"
}
```

### 參考項目原理圖

![hwdc-24-angular-ssg](https://github.com/UrWebApp/Topage/blob/main/assets/ag-ssg-schematic.png)

### Angular Universal Files Introduction

server.ts：設定 Express 伺服器，用於提供伺服端渲染 (SSR) 的 Angular 應用。

main.server.ts：伺服端應用的入口點，處理伺服端渲染。

app.config.ts：主要用於客戶端配置，包括 API 基本 URL、功能開關和其他環境設定。

app.config.server.ts：用於伺服器端的配置，可能包含與伺服器相關的設置，如安全性設定、伺服器端 API 路徑等。

### Feature Info

更多相關內容請查閱 [/UrWebApp/ComponentLibrary](https://github.com/UrWebApp/ComponentLibrary)

#### Angular Resolve

路由流程 => 點擊連結 => (Resolve) => AG 加載各自組件 => 進入各組件生命週期

#### Slug

通常指的是一個簡短、易於辨識的字串，用來表示特定的資源，常見於網頁 URL 中。

1. 全部使用小寫字母
2. 單詞之間通常用連字號（-）分隔
3. 不包含特殊字符或空格

#### Prerender

除了上述機制也可以透過 1. 控制 angular.json => `"guessRoutes": false` 避免自動渲染

請參閱：https://github.com/angular/universal/blob/3e0efbeb2ad490caead49d53809af97ace6e03a7/modules/builders/src/prerender/schema.json#L30:L34

2. 配置 router 內 data.prerender 屬性

```
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent, data: { prerender: true } },
  { path: 'contact', component: ContactComponent, data: { prerender: false } },
];
```

#### Stnadalone

#### 原先 Hexo 遇到問題當多個 Angular 專案被編譯並部署在同一個網站上時，如果這些專案共享相同的 Angular Library，可能會遇到 Library 重複編譯的問題。這會導致代碼冗餘，增加加載時間，並且可能產生衝突

#### Reference:

* [[Angular Universal] 使用 Prerender 建立自己的 Static Site Generator](https://fullstackladder.dev/blog/2021/10/16/static-site-generator-using-angular-universal-prerender/)
* [AngularPrerender](https://github.com/UrWebApp/ComponentLibrary/tree/master/AngularPrerender)
* [高效 Coding 術：Angular Schematics 實戰三十天](https://ithelp.ithome.com.tw/articles/10214018)
* [預先載入資料Resolve](https://blog.talllkai.com/Angular/2022/10/28/Resolve#google_vignette)
* [理解Angular中的Resolver](https://www.huangyuexiang.com/2019/04/27/%E7%90%86%E8%A7%A3Angular%E4%B8%AD%E7%9A%84Resolver/)
* [進階議題 Angular Elements 簡介](https://fullstackladder.dev/blog/2018/05/08/angular-advanced-angular-elements-intro/)
* [How can I control which routes Angular decides to Prerender?](https://stackoverflow.com/questions/64299597/how-can-i-control-which-routes-angular-decides-to-prerender)
* [從0開始的的Angular站台架設-Stnadalone](https://ithelp.ithome.com.tw/users/20162031/ironman/6181)
