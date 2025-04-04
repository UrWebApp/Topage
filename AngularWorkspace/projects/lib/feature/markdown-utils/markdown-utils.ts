import * as yaml from 'js-yaml';
import hljs from 'highlight.js';
import { marked, Tokens } from 'marked';
import 'highlight.js/styles/github-dark.css';
import { markedHighlight } from 'marked-highlight';


const isServer = typeof window === 'undefined';

const markdownYamlMetaPattern = /^(?:---)(.*?)(?:---|\.\.\.)/s;

// 語法高亮：根據語言回傳處理後 HTML
const highlightCode = (code: string, lang: string): string => {
  try {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  } catch {
    return code;
  }
};

// 初始化 marked 插件
// 避免在 npm run start 開發時造成編譯 markdown 加上高亮語法造成記憶體外洩
if (!isServer) {
  marked.use(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight: highlightCode,
    })
  );
}

// 將 YAML 區塊從 Markdown 中拆解出來
const parseYamlMeta = (
  markdownContent: string
): { meta: MarkdownYamlMeta | null; content: string } => {
  const metaMatch = markdownContent.match(markdownYamlMetaPattern);

  if (!metaMatch || metaMatch.length <= 1) {
    return { meta: null, content: markdownContent };
  }

  let yamlMeta: MarkdownYamlMeta | null = null;

  try {
    yamlMeta = yaml.load(metaMatch[1]) as MarkdownYamlMeta;
  } catch (err) {
    console.warn('YAML parse failed:', err);
  }

  const content = markdownContent.replace(metaMatch[0], '').trim();
  return { meta: yamlMeta, content };
};

// 單筆 Markdown 的解析器（加上記憶體安全性設計）
export const parseMarkdownFile = (
  markdownContent: string
): MarkdownData | null => {
  if (!markdownContent || typeof markdownContent !== 'string') return null;

  const { meta, content } = parseYamlMeta(markdownContent);

  // 建立自定義 renderer
  const renderer = new marked.Renderer();

  // 客製化 blockquote 轉換方式，加上 class
  // renderer.blockquote = (quote) => {
  //   return `<blockquote class="article-blockquote">${quote.text}</blockquote>`;
  // };

  // 套用 renderer
  marked.use({ renderer });
  // 使用 marked.parse 不要包在 try-catch 裡會更有效率，除非有複雜套件使用
  const html = marked.parse(content);

  return {
    meta,
    content: html.toString(),
  };
};

// 定義資料型別
export interface MarkdownYamlMeta {
  title: string;
  date: Date | string;
  category: string;
  tags: string[];
  summary: string;
  author: string;
}

export interface MarkdownData {
  meta: MarkdownYamlMeta | null;
  content: string;
}
