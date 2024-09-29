import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
// import * as fs from 'fs/promises';

// 更詳細的應用範例可參考
// https://github.com/wellwind/ngx-cli-builders-demo/blob/master/builders/src/generate-posts-json/index.ts

// 設定相關參數的 interface
interface Options extends JsonObject {
    name: string;
}

// 使用 createBuilder 函數創建一個新的 Builder
export default createBuilder(demo);

// 這是實際的 Builder 實現
function demo(
    options: Options,
    context: BuilderContext // 提供一些 builder 的資訊及工具
): BuilderOutput {

    context.logger.info('Starting');

    // 一些 node 能做到的事/流程，可參考其他專案

    // const markdownFiles = (await fs.readdir(options.markdownPostsPath, { withFileTypes: true }))
    //     .filter(value => value.isFile() && value.name.endsWith('.md'))
    //     .map(value => value.name);

    // if (markdownFiles.length === 0) {
    //     return { success: false, error: "No markdown files" };
    // }

    // const contentJson = {
    //     articles: markdownFiles
    // }

    // await fs.writeFile(options.targetJsonPath, JSON.stringify(contentJson));

    context.logger.info('Done');

    return { success: true };
}