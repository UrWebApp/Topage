import { Rule, SchematicContext, Tree, chain } from '@angular-devkit/schematics';
import { dasherize } from '@angular-devkit/core/src/utils/strings';
import * as path from 'path';

// ---------------------------------------------------------
// 1. 輔助函式：Frontmatter 解析器 (支援 YAML 多行列表)
// ---------------------------------------------------------
function cleanValue(val: string): string {
  val = val.trim();
  if ((val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))) {
    return val.slice(1, -1);
  }
  return val;
}

function parseFrontMatter(content: string): { meta: Record<string, any>, body: string } {
  const match = content.match(/---\s*[\r\n]+([\s\S]*?)[\r\n]+---([\s\S]*)/);
  if (!match) return { meta: {}, body: content };

  const metadata: Record<string, any> = {};
  const lines = match[1].split(/\r?\n/); // 兼容不同作業系統的換行符
  const body = match[2].trim();

  let currentListKey: string | null = null;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue; // 跳過空行

    // 1. 檢查是否為列表項目 (例如: - .Net)
    if (trimmedLine.startsWith('-')) {
      if (currentListKey) {
        const value = trimmedLine.slice(1).trim(); // 移除開頭的 '-'
        if (!Array.isArray(metadata[currentListKey])) {
          metadata[currentListKey] = [];
        }
        metadata[currentListKey].push(cleanValue(value));
      }
      continue; // 處理完列表項目後，跳過本次迴圈
    }

    // 2. 檢查是否為 Key-Value 定義 (例如: title: Hello 或 tags:)
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();

      // 如果值為空，可能是一個多行列表的開始 (例如 "tags:")
      if (!value) {
        currentListKey = key;
        metadata[key] = []; // 先初始化為空陣列
      } else {
        // 如果有值，先重置目前的列表鍵 (因為已經開始新的鍵了)
        currentListKey = null;

        // 檢查是否為 Inline 陣列 (例如: tags: [.Net, Angular])
        if (value.startsWith('[') && value.endsWith(']')) {
          const arrayContent = value.slice(1, -1).trim();
          if (arrayContent.length === 0) {
            metadata[key] = [];
          } else {
            metadata[key] = arrayContent.split(',').map(item => cleanValue(item));
          }
        } else {
          // 一般字串值
          metadata[key] = cleanValue(value);
        }
      }
    }
  }
  return { meta: metadata, body: body };
}

// ---------------------------------------------------------
// New: Markdown 摘要產生器
// ---------------------------------------------------------
function generateSummary(markdownBody: string, limit: number = 200): { summary: string, image: string | null } {
  if (!markdownBody) return { summary: '', image: null };

  // 1. 嘗試提取第一張 Markdown 圖片
  const imgMatch = markdownBody.match(/!\[.*?\]\((.*?)\)/);
  const image = imgMatch ? imgMatch[1] : null;

  // 2. 移除 Markdown 語法
  let text = markdownBody
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/#+\s/g, '')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`.*?`/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const summary = text.length > limit ? text.substring(0, limit) + '...' : text;
  return { summary, image };
}

// ---------------------------------------------------------
// 2. Rule: 產生 Markdown 檔案 (支援 i18n)
// ---------------------------------------------------------
export function generateMarkdownFile(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    _context.logger.info('📄 Start Generating a content');

    const date = new Date();
    const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();

    const fileContent = `---
title: "${options.name}"
date: ${isoDateTime.slice(0, 19).replace('T', ' ')}
category: "${options.category}"
tags: []
---

Write your content here...
`;

    // 1. 處理語言選項，預設使用 'zh-tw'
    const lang = options.language || 'zh-tw';
    const dasherizeName = `${dasherize(options.name)}`;

    // 2. 路徑加入語言層級 projects/ssg-site/public/content/{lang}/{category}/{filename}
    const categoryDir = `projects/ssg-site/public/content/${lang}/${dasherize(options.category)}`;
    const fileName = `${dasherizeName}.md`;
    const filePath = `${categoryDir}/${fileName}`;

    _context.logger.info(`Creating file at: ${filePath}`);
    tree.create(filePath, fileContent);

    return tree;
  };
}

// ---------------------------------------------------------
// 3. Rule: 更新 routes.txt 與 articles-list.json (支援 i18n)
// ---------------------------------------------------------
export function updateRouteTxt(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    _context.logger.info('🔄 Updating routes.txt and articles-list.json...');

    // 3. 定義靜態基礎路由，後續會自動乘上語言前綴
    const staticBaseRoutes = ['', 'list', 'syservice'];
    let allRoutes: string[] = [];

    const baseDir = 'projects/ssg-site/public/content';
    const articles: any[] = [];

    const contentDir = tree.getDir(baseDir);

    // 4. 雙層資料夾掃描 (Language -> Category)
    // 第一層迴圈：掃描語言資料夾 (例如 zh-tw, en)
    contentDir.subdirs.forEach(lang => {
      const langDir = contentDir.dir(lang);

      // 4-1. 為每個語言生成靜態路由 (例如 /zh-tw, /zh-tw/list)
      staticBaseRoutes.forEach(base => {
        const route = base ? `/${lang}/${base}` : `/${lang}`;
        allRoutes.push(route);
      });

      // 第二層迴圈：掃描分類資料夾 (例如 tech, life)
      langDir.subdirs.forEach(category => {
        const categoryDir = langDir.dir(category);

        categoryDir.subfiles.forEach(file => {
          if (file.endsWith('.md')) {
            // 5. 路由加入語言前綴 /zh-tw/tech/article-name
            const route = `/${lang}/${category}/${path.parse(file).name}`;
            allRoutes.push(route);

            const filePath = `${baseDir}/${lang}/${category}/${file}`;
            const content = tree.read(filePath);

            if (content) {
              const strContent = content.toString('utf-8');
              const { meta, body } = parseFrontMatter(strContent);
              const { summary, image } = generateSummary(body, 150);

              const safeMeta = {
                ...meta,
                tags: Array.isArray(meta['tags']) ? meta['tags'] : []
              };

              // 6. 資料結構加入 lang 欄位
              articles.push({
                lang: lang,
                route: route,
                markdownData: {
                  meta: safeMeta,
                  summary: summary,
                  coverImage: image,
                  body: '' // 列表頁通常不需要全文
                }
              });
            }
          }
        });
      });
    });

    // 寫入 routes.txt
    const routesString = allRoutes.join('\n');
    const routesPath = 'projects/ssg-site/routes.txt';
    const assetsRoutesPath = 'projects/ssg-site/public/assets/routes.txt';

    if (tree.exists(routesPath)) tree.overwrite(routesPath, routesString);
    else tree.create(routesPath, routesString);

    if (tree.exists(assetsRoutesPath)) tree.overwrite(assetsRoutesPath, routesString);
    else tree.create(assetsRoutesPath, routesString);

    // 寫入 articles-list.json
    const jsonPath = 'projects/ssg-site/public/assets/articles-list.json';
    const jsonContent = JSON.stringify(articles, null, 2);

    if (tree.exists(jsonPath)) tree.overwrite(jsonPath, jsonContent);
    else tree.create(jsonPath, jsonContent);

    _context.logger.info(`✅ Updated routes and articles list for languages: ${contentDir.subdirs.join(', ')}`);

    return tree;
  };
}

export default function(options: any): Rule {
  return chain([
    generateMarkdownFile(options),
    updateRouteTxt(),
  ]);
}
