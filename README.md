# Topage

we are going to build something...

## Angular WorkSpace

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

#### Reference:

* [[Angular Universal] 使用 Prerender 建立自己的 Static Site Generator](https://fullstackladder.dev/blog/2021/10/16/static-site-generator-using-angular-universal-prerender/)
* [AngularPrerender](https://github.com/UrWebApp/ComponentLibrary/tree/master/AngularPrerender)
* [高效 Coding 術：Angular Schematics 實戰三十天](https://ithelp.ithome.com.tw/articles/10214018)

