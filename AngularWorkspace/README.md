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
"prerender": true,
"ssr": false, // turn off
// "ssr": {
//   "entry": "projects/ssg-site/server.ts"
// }
"define": {
    "isDevMode": "true"
}
```

### Angular Universal Files Introduction

server.ts：設定 Express 伺服器，用於提供伺服端渲染 (SSR) 的 Angular 應用。

main.server.ts：伺服端應用的入口點，處理伺服端渲染。

app.config.ts：主要用於客戶端配置，包括 API 基本 URL、功能開關和其他環境設定。

app.config.server.ts：用於伺服器端的配置，可能包含與伺服器相關的設置，如安全性設定、伺服器端 API 路徑等。

### Feature Info

更多相關內容請查閱 [/UrWebApp/ComponentLibrary](https://github.com/UrWebApp/ComponentLibrary)

#### Angular Resolve

路由流程 => 點擊連結 => (Resolve) => AG 加載各自組件 => 進入各組件生命週期

#### Reference:

* [[Angular Universal] 使用 Prerender 建立自己的 Static Site Generator](https://fullstackladder.dev/blog/2021/10/16/static-site-generator-using-angular-universal-prerender/)
* [AngularPrerender](https://github.com/UrWebApp/ComponentLibrary/tree/master/AngularPrerender)
* [高效 Coding 術：Angular Schematics 實戰三十天](https://ithelp.ithome.com.tw/articles/10214018)
* [預先載入資料Resolve](https://blog.talllkai.com/Angular/2022/10/28/Resolve#google_vignette)
* [理解Angular中的Resolver](https://www.huangyuexiang.com/2019/04/27/%E7%90%86%E8%A7%A3Angular%E4%B8%AD%E7%9A%84Resolver/)
* [進階議題 Angular Elements 簡介](https://fullstackladder.dev/blog/2018/05/08/angular-advanced-angular-elements-intro/)
