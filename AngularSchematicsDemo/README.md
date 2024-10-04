# Angular Schematics demo

This project help us to familiar and know how to use angular schematics.

## Angular Schematics Purpose

Angular Schematics is a tool of angular, but not only limit used in Angular.
Angular Cli is base on the schematics feature.
these are the schematics in angular cli
```
ng new [name] [option]
ng add <library>
ng generate <type> <name>
ng update
``` 
for the core feature, it can do:

### generate code/test template:
  
Automatically generate code structures like components, services, modules, guards, pipes, and more. This helps in maintaining consistency across the project.

### update code

Schematics can be used to refactor or update existing code. For example, they can help you migrate deprecated APIs or features to new ones.


---

This repository is a basic Schematic implementation that serves as a starting point to create and publish Schematics to NPM.

To publish, simply do:

```bash
npm run build
npm publish
```

That's it!

## STEP

1. `pnpm install -g @angular-devkit/schematics-cli` 安裝示意圖(schematics)套件
2. `schematics blank --name=hello-world` 建立專案
3. 因为在此系统上禁止运行脚本。有关详细信息，请参阅... 管理員身份輸入 `set-executionpolicy remotesigned`
4. 確定專案正常 `pnpm run build` => `schematics .:angular-schematics-demo`
    - 會產生純 js 檔案，這樣其他框架也能使用

5. collection.js 是專案進入點 schematics 欄位定義所有 schematics，欄位 angular-schematics-demo 是示意圖名稱，factory 實際觸發程式碼位置
   - collection.json 的主要部分
     - schematics：
這個部分列出了所有可用的 schematics。每個 schematic 都有唯一的名稱，並且定義了其對應的執行邏輯（factory）及其可用的選項。
     - factory：
      指向具體的 TypeScript 文件，該文件包含實際執行該 schematic 的邏輯。這是 Angular CLI 執行 schematics 的入口，也就是實際觸發的程式碼所在位置（語法為：相對路徑#函式名稱）。
     - description：
      簡單描述該 schematic 的功能，幫助開發者了解它的用途。
     - schema：
      指向一個 .json 文件，該文件定義了 schematic 可接受的選項或參數。這可以用來驗證執行時輸入的參數是否正確。
1. 簡介三大概念 ./index.ts => `Tree, Rule, Source`
2. `pnpm run build` + `schematics .:angular-schematics-demo --name=nickname` 測試 + `--dry-run=false`or`--debug=false` 真的建立檔案
3. JSON Schema： 描述另一組 JSON 的數據結構的 JSON
4.  新增 schema.json 用來驗證使用者輸入的 schematics 參數 ex. --name，`$schema`：JSON Schema 版本、`id`：識別 Collection 內的唯一名稱、`required`：必填、`default`：默認，(argv 0) 指令內的第一個參數默認為 name，`x-prompt`：cli 內的提示訊息  ...
5.  sechematics 使用範本產生檔案 mergeWith 時，透過 `__` 判斷檔案上需要覆蓋的參數名稱 => 

> 進階

```
"x-prompt": {
        "message": "Which name would you like?",
        "type": "list",
        "items": [
          { "value": "leo",  "label": "Leo" },
          { "value": "kevin", "label": "Kevin" },
          { "value": "mike", "label": "Mike" },
          { "value": "will", "label": "Will" },
        ]
      }
```

10. collection.json 內需補上新增加的 schema.json

## REF

1. [高效 Coding 術：Angular Schematics 實戰三十天](https://ithelp.ithome.com.tw/users/20090728/ironman/2149)
2. [Schematics 實戰 基本介紹](https://fullstackladder.dev/blog/2019/11/30/schematics-workshop-01-intro/)