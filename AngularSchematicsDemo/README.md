# Getting Started With Schematics

This repository is a basic Schematic implementation that serves as a starting point to create and publish Schematics to NPM.

### Testing

To test locally, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with

```bash
schematics --help
```

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

### Publishing

To publish, simply do:

```bash
npm run build
npm publish
```

That's it!

## STEP

1. `pnpm install -g @angular-devkit/schematics-cli` 安裝示意圖套件
2. `schematics blank --name=hello-world` 建立專案
3. 因为在此系统上禁止运行脚本。有关详细信息，请参阅... 管理員身份輸入 `set-executionpolicy remotesigned`
4. 確定專案正常 `pnpm run build` => `schematics .:angular-schematics-demo`
5. collection.js 是專案進入點 schematics 欄位定義所有 schematics，欄位 angular-schematics-demo 是示意圖名稱，factory 實際觸發程式碼位置
6. 簡介三大概念 ./index.ts => `Tree, Rule, Source`
7. `pnpm run build` + `schematics .:angular-schematics-demo --name=nickname` 測試 + `--dry-run=false` 真的建立檔案
8. JSON Schema： 描述另一組 JSON 的數據結構的 JSON
9. 新增 schema.json 用來驗證使用者輸入的 schematics 參數 ex. --name，`$schema`：JSON Schema 版本、`id`：識別 Collection 內的唯一名稱、`required`：必填、`default`：默認，(argv 0) 指令內的第一個參數默認為 name，`x-prompt`：cli 內的提示訊息  ...
10. sechematics 使用範本產生檔案 mergeWith 時，透過 `__` 判斷檔案上需要覆蓋的參數名稱 => 

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