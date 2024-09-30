# Angular WorkSpace

1. init monorepo workspace
```bash
ng new my-monorepo --create-application=false
```
2. generate a project in Monorepo
```bash
ng generate application my-ssg-app
```

3. add Angular Universal

```bash
ng add @nguniversal/express-engine --project=my-ssg-app
```
or enable it when use cli generate app in step2.


通過這些步驟，你就可以在 Angular 原生的 Monorepo 中創建並運行一個 SSG 項目了。

### SSG SITE

our main blog, because of the seo, we use angular universal to build a SSG Site.

Because we only need prerender feature but not SSR, so we have to disable SSR Option
```json
"scripts": [],
"browser": "src/main.ts",
"server": "src/main.server.ts",
"prerender": true,
"ssr": false, // turn off
"define": {
    "isDevMode": "true"
}
```

## STEP

1. 目前 AG CLI 非常方便 Libraries WorkSpace SSG 在 CLI 選項中點點設定就搞定了

## Feature Info

### Angular Resolve

路由流程 => 點擊連結 => (Resolve) => AG 加載各自組件 => 進入各組件生命週期

#### Reference:

* [[Angular Universal] 使用 Prerender 建立自己的 Static Site Generator](https://fullstackladder.dev/blog/2021/10/16/static-site-generator-using-angular-universal-prerender/)
* [AngularPrerender](https://github.com/UrWebApp/ComponentLibrary/tree/master/AngularPrerender)
* [高效 Coding 術：Angular Schematics 實戰三十天](https://ithelp.ithome.com.tw/articles/10214018)
* [預先載入資料Resolve](https://blog.talllkai.com/Angular/2022/10/28/Resolve#google_vignette)
* [理解Angular中的Resolver](https://www.huangyuexiang.com/2019/04/27/%E7%90%86%E8%A7%A3Angular%E4%B8%AD%E7%9A%84Resolver/)
