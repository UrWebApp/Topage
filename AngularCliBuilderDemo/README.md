# Angular Cli Builder

自定義擴展 ng xxx，允許開發者自定義任務、流程，例如構建、測試或部署應用。

> 需要再 Node 專案內實作 Angular CLI Builder API，並透過本地 "npm link xxxBuilder" 或發佈到 NPM i 才能與 AG cli 整合

更詳細的應用範例可參考

[https://github.com/wellwind/ngx-cli-builders-demo](https://github.com/wellwind/ngx-cli-builders-demo/blob/master/builders/src/generate-posts-json/index.ts)

製作完成後透過 `pnpm link ./builders` 不需發佈 NPM 即可在 AG 內安裝連結地端的 builder

接著即可在 `angular.json` 內 `projects.{專案名稱}.architect` 設置並使用 `ng run [專案名稱]:[builder 名稱]`

```
{
    "projects": {
        ...
        "architect": {
            "build": {
                "builder": "...",
            },
            ...
            "demo": {
                "builder": "demo:angular-cli-builder-demo",
                "options": {
                    "name": "src/assets",
                    ...
                }
            }
        }
    }
}
```

builder 能回傳的型別除了 `BuilderOutput`, `Promise<BuilderOutput>`，還能結合 `Observable<BuilderOutput>`，可以持續運作 e.g. 加入 watch mode，每當指定目錄內有 *.md 變更時，就會重新產生 json 檔

REF. [https://fullstackladder.dev/blog/2021/10/23/learn-angular-cli-builders/](https://fullstackladder.dev/blog/2021/10/23/learn-angular-cli-builders/)

## Builder Files Structure

```
> package.json
    { 
        "builders": "builders.json",
        "scripts":{ "build": "npx tsc" }, // 主要是透過 TypeScript 編輯 Builder 後續要透過 tsc 編譯為 js
        "dependencies": {
                "@angular-devkit/architect": "*.0", // 跟 Builder CLI 相關的程式都在這裡
                "@angular-devkit/core": "*.0", // 跟 Builder CLI 相關的程式都在這裡
                "@angular-devkit/build-angular": "*.0" // 如要擴充 Angular CLI 指令的相關程式都在這裡，該套件本身也是一個 CLI Builder 套件
        },
        "devDependencies": {
                "typescript": "^*.*.*"
                move...
        }
    }

> tsconfig.json // TypeScript 開發必備的設定檔
    {
        "compilerOptions": {
            "module": "commonjs",
            "outDir": "./dist"
        }
    }

> index.js // builder 主程式碼
> schema.json // 定義 builder 參數結構，必填、預設值...

> builders.json // 定義此專案有哪些 builder 主程式位置、參數結構位置
    {
        "builders": {
            "generate-posts-json": {
                "implementation": "./dist/demo/index.js",
                "schema": "./src/demo/schema.json",
                "description": "Angular Cli Builder Demo."
            }
        }
    }

```

## Additional Info

1. npx（Node Package Executor）：

npx 是一个专门用于执行 npm 包中的可执行命令的工具。

它可以直接运行本地或远程的 npm 包中的命令，避免手动查找路径或全局安装工具。

npx 可以用于临时执行 npm 包，而不必将其安装到本地或全局环境中。

常见用法：

运行本地已安装的命令：npx tsc

临时运行未安装的命令：npx create-react-app my-app

2. TypeScript Compiler (TSC)：

TypeScript Compiler（通常簡稱為 TSC）是用來將 TypeScript 程式碼編譯（transpile）成 JavaScript 的工具。

TypeScript 是 JavaScript 的超集，增加了靜態類型等功能，而 TSC 則負責將 

TypeScript 原始碼轉換成純 JavaScript，因為瀏覽器和伺服器只能執行 JavaScript。

TSC 也提供靜態分析和錯誤檢查功能，能夠幫助開發者在編譯過程中發現潛在的錯誤。

3. . "module": "commonjs"

含義: 指定生成的 JavaScript 模組格式。

CommonJS 是一種模組系統，常用於 Node.js 環境中。

TypeScript 會將模組轉譯為 CommonJS 模式，這意味著生成的 JavaScript 文件會使用 require() 和 module.exports 來處理模組的匯入和匯出。

## REF

* [官方 Angular CLI 建構器](https://angular.dev/tools/cli/cli-builder)
* [Angular CLI 构建器（Builder）](https://v10.angular.cn/guide/cli-builder)
* [透過 CLI Builder API 加強 Angular CLI 功能](https://fullstackladder.dev/blog/2021/10/23/learn-angular-cli-builders/)
* [Angular CLI builder 学习笔记](https://developer.aliyun.com/article/828125)